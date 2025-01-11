using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Ingredient;

[ExtendObjectType(typeof(Query))]
public class QueryIngredientsResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Ingredient> GetIngredientsOffset(ReciperContext context)
    {
        return context.Ingredients.AsNoTracking();
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Ingredient> GetIngredientsCursor(ReciperContext context)
    {
        return context.Ingredients.AsNoTracking();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Ingredient> GetIngredientById(
        ReciperContext context,
        Guid ingredientId
    )
    {
        return context
            .Ingredients.AsNoTracking()
            .Where(ingredient => ingredient.Id == ingredientId);
    }
}
