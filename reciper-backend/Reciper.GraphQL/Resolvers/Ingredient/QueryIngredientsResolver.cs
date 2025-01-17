using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.Ingredient;
using Reciper.BLL.Search.Criteria.Ingredient.Handlers;
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
    public IQueryable<DAL.Models.Ingredient> GetIngredientsOffset(
        ReciperContext context,
        IngredientSearchCriteria? searchCriteria)
    {
        return QueryHandler(context, searchCriteria);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Ingredient> GetIngredientsCursor(
        ReciperContext context,
        IngredientSearchCriteria? searchCriteria)
    {
        return QueryHandler(context, searchCriteria);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Ingredient> GetIngredientById(ReciperContext context, Guid ingredientId)
    {
        return context.Ingredients.AsNoTracking().Where(ingredient => ingredient.Id == ingredientId);
    }

    private IQueryable<DAL.Models.Ingredient> QueryHandler(
        ReciperContext context,
        IngredientSearchCriteria? searchCriteria)
    {
        var queryHandlerChain = new SearchCriteriaHandlerChainBuilder<
            ReciperContext,
            IngredientSearchCriteria,
            DAL.Models.Ingredient
        >().BuildChain(
            [
                new IngredientSearchCriteriaOverallMatchingHandler()
            ]
        );

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}