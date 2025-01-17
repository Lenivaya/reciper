using System.Text;
using System.Text.Json.Serialization;
using CloudinaryDotNet;
using HotChocolate.AspNetCore.Voyager;
using HotChocolate.Language;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Reciper.BLL.Contracts;
using Reciper.BLL.DTO;
using Reciper.BLL.Services;
using Reciper.DAL.Migrations;
using Reciper.DAL.Models;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Resolvers.Comment;
using Reciper.GraphQL.Resolvers.Ingredient;
using Reciper.GraphQL.Resolvers.Rating;
using Reciper.GraphQL.Resolvers.Recipe;
using Reciper.GraphQL.Resolvers.RecipeLike;
using Reciper.GraphQL.Resolvers.Tag;
using Reciper.GraphQL.Resolvers.Users;
using Reciper.GraphQL.Resolvers.UserSubscription;
using Reciper.GraphQL.Schema;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

MapsterConfig.ConfigureServices(builder.Services);

builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);


builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetValue<string>("JwtSettings:Issuer"),
            ValidAudience = builder.Configuration.GetValue<string>("JwtSettings:Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration.GetValue<string>("JwtSettings:Key") ?? string.Empty
                )
            )
        };
    });

builder.Services.AddAuthorization();

builder
    .Services.AddHttpLogging(options => { options.LoggingFields = HttpLoggingFields.Request; })
    .AddCors();

builder
    .Services.AddPooledDbContextFactory<ReciperContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        options.UseSqlServer(connectionString);
    })
    .AddTransient<ReciperUnitOfWork>();

var redisConnectionString = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";

builder.Services.AddTransient<IPasswordService, PasswordService>()
    .AddTransient<ITokenService>(_ => new TokenService(
        builder.Configuration.GetValue<string>("JwtSettings:Key")!,
        builder.Configuration.GetValue<string>("JwtSettings:Issuer")!,
        builder.Configuration.GetValue<string>("JwtSettings:Audience")!
    ))
    ;

builder.Services.AddTransient<ICloudinary>(prov =>
{
    var connectionString = builder.Configuration.GetConnectionString("Cloudinary");
    var cloudinary = new Cloudinary(connectionString)
    {
        Api =
        {
            Secure = true
        }
    };
    return cloudinary;
});

builder.Services.AddSha256DocumentHashProvider(HashFormat.Hex);

builder
    .Services.AddGraphQLServer()
    .AddType<UploadType>()
    .AddAuthorization()
    .RegisterDbContextFactory<ReciperContext>()
    .AddRedisSubscriptions(_ => ConnectionMultiplexer.Connect(redisConnectionString))
    .AddHttpRequestInterceptor<HttpRequestAuthenticationInterceptor>()
    .AddMutationConventions()
    .AddProjections()
    .AddExtendedFiltering()
    .AddSorting()
    .AddQueryType<Query>()
    .AddTypeExtension<QueryRecipesResolver>()
    .AddTypeExtension<QueryTagsResolver>()
    .AddTypeExtension<QueryIngredientsResolver>()
    .AddTypeExtension<QueryUsersResolver>()
    .AddTypeExtension<QueryCommentsResolver>()
    .AddTypeExtension<QueryRatingsResolver>()
    .AddTypeExtension<QueryUserSubscriptionsResolver>()
    .AddTypeExtension<QueryRecipeLikesResolver>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<MutationRecipesResolver>()
    .AddTypeExtension<MutationTagsResolver>()
    .AddTypeExtension<MutationIngredientsResolver>()
    .AddTypeExtension<MutationUsersResolver>()
    .AddTypeExtension<MutationCommentsResolver>()
    .AddTypeExtension<MutationRatingsResolver>()
    .AddTypeExtension<MutationUserSubscriptionsResolver>()
    .AddTypeExtension<MutationRecipeLikesResolver>()
    .AddSubscriptionType<Subscription>()
    .AddTypeExtension<SubscriptionRecipesResolver>()
    .AddTypeExtension<UserType>()
    .AddTypeExtension<UserQueryExtensions>()
    .AddTypeExtension<RecipeQueryExtensions>()
    .UseAutomaticPersistedOperationPipeline()
    .AddRedisOperationDocumentStorage(_ =>
        ConnectionMultiplexer.Connect(redisConnectionString).GetDatabase()
    )
    .ModifyRequestOptions(options =>
    {
        options.ExecutionTimeout = TimeSpan.FromSeconds(60);
        options.IncludeExceptionDetails = true;
    })
    .InitializeOnStartup();

var app = builder.Build();

app.UseRouting().UseWebSockets();


app.UseAuthentication();
app.UseAuthorization();

app.UseForwardedHeaders(
    new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    }
);

if (app.Environment.IsDevelopment())
{
    app.UseHttpLogging();
    app.UseDeveloperExceptionPage();
}

app.UseCors(corsPolicyBuilder =>
    corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
);


if (!app.Environment.IsDevelopment())
{
    app.UseResponseCompression();
}

app.UseHttpsRedirection();
app.UseVoyager("/graphql", "/voyager");

app.MapGraphQL();

await app.RunWithGraphQLCommandsAsync(args);