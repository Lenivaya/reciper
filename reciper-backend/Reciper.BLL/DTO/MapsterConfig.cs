using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using Reciper.DAL.Models;

namespace Reciper.BLL.DTO;

public static class MapsterConfig
{
    public static void ConfigureServices(IServiceCollection serviceCollection)
    {
        var typeAdapterConfig = new TypeAdapterConfig();
        Register(typeAdapterConfig);
        serviceCollection.AddSingleton(typeAdapterConfig).AddScoped<IMapper, ServiceMapper>();
    }

    private static void Register(TypeAdapterConfig config)
    {
        // Configure all patch DTOs to ignore null values
        config.NewConfig<RecipePatchDTO, Recipe>().IgnoreNullValues(true);
        config.NewConfig<CommentPatchDTO, Comment>().IgnoreNullValues(true);
        config.NewConfig<RatingPatchDTO, Rating>().IgnoreNullValues(true);
        config.NewConfig<UserPatchDTO, User>().IgnoreNullValues(true);
        config.NewConfig<RecipeIngredientPatchDTO, RecipeIngredient>().IgnoreNullValues(true);
        config.NewConfig<IngredientPatchDTO, Ingredient>().IgnoreNullValues(true);
        config.NewConfig<TagPatchDTO, Tag>().IgnoreNullValues(true);
        config.NewConfig<RecipeImagePatchDTO, RecipeImage>().IgnoreNullValues(true);

        // Configure any special mapping rules here if needed
        config
            .NewConfig<RecipeCreateDTO, Recipe>()
            .Map(dest => dest.RecipeTags, src => src.Tags.Select(t => new RecipeTag { TagId = t }))
            .Map(
                dest => dest.RecipeIngredients,
                src =>
                    src.Ingredients.Select(i => new RecipeIngredient
                    {
                        IngredientId = i.IngredientId,
                        Amount = i.Amount,
                    })
            );

        config
            .NewConfig<RecipePatchDTO, Recipe>()
            .Map(dest => dest.RecipeTags, src => src.Tags.Select(t => new RecipeTag { TagId = t }))
            .Map(
                dest => dest.RecipeIngredients,
                src =>
                    src.Ingredients.Select(i => new RecipeIngredient
                    {
                        IngredientId = i.IngredientId,
                        Amount = i.Amount,
                    })
            );

        config
            .NewConfig<UserCreateDTO, User>()
            .Map(dest => dest.IsActive, _ => true)
            .IgnoreNullValues(true);
    }
}
