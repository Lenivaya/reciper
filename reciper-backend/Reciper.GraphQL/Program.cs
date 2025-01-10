using System.Text.Json.Serialization;
using HotChocolate.AspNetCore.Voyager;
using HotChocolate.Language;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.DAL.Models;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Resolvers.Ingredient;
using Reciper.GraphQL.Resolvers.Recipe;
using Reciper.GraphQL.Resolvers.Tag;
using Reciper.GraphQL.Schema;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

MapsterConfig.ConfigureServices(builder.Services);

builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

builder
    .Services.AddHttpLogging(options =>
    {
        options.LoggingFields = HttpLoggingFields.Request;
    })
    .AddCors();

builder
    .Services.AddPooledDbContextFactory<ReciperContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        options.UseSqlServer(connectionString);
    })
    .AddTransient<ReciperUnitOfWork>();

var redisConnectionString = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";

builder.Services.AddSha256DocumentHashProvider(HashFormat.Hex);

builder
    .Services.AddGraphQLServer()
    .RegisterDbContextFactory<ReciperContext>()
    .AddRedisSubscriptions(_ => ConnectionMultiplexer.Connect(redisConnectionString))
    .AddMutationConventions()
    .AddProjections()
    .AddExtendedFiltering()
    .AddSorting()
    .AddQueryType<Query>()
    .AddTypeExtension<QueryRecipesResolver>()
    .AddTypeExtension<QueryTagsResolver>()
    .AddTypeExtension<QueryIngredientsResolver>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<MutationRecipesResolver>()
    .AddTypeExtension<MutationTagsResolver>()
    .AddTypeExtension<MutationIngredientsResolver>()
    .AddSubscriptionType<Subscription>()
    .AddTypeExtension<SubscriptionRecipesResolver>()
    .UseAutomaticPersistedOperationPipeline()
    .AddRedisOperationDocumentStorage(services =>
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
app.UseForwardedHeaders(
    new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
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

// app.UseHttpsRedirection();
app.UseVoyager("/graphql", "/voyager");

app.MapGraphQL();

await app.RunWithGraphQLCommandsAsync(args);
