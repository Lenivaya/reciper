using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.GraphQL.Resolvers.Recipe;

public class RecipeType
{
}

[ExtendObjectType(typeof(DAL.Models.Recipe))]
public class RecipeQueryExtensions
{
    /// <summary>
    /// This method calculates the average rating for a recipe.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="recipe"></param>
    /// <returns></returns>
    public async Task<double> GetAverageRating(
        ReciperContext context,
        [Parent] DAL.Models.Recipe recipe
    )
    {
        var ragingsWithRecipeId = context.Ratings
            .Where(rating => rating.RecipeId == recipe.Id);

        return await ragingsWithRecipeId.AnyAsync()
            ? await ragingsWithRecipeId.AverageAsync(rating => rating.Value)
            : 0;
    }

    /// <summary>
    /// This method calculates the number of likes for a recipe.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="recipe"></param>
    /// <returns></returns>
    public async Task<int> GetLikesCount(
        ReciperContext context,
        [Parent] DAL.Models.Recipe recipe
    )
    {
        return await context.RecipeLikes.CountAsync(like => like.RecipeId == recipe.Id);
    }
}