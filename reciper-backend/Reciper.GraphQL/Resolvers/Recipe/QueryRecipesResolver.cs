using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.Recipe;
using Reciper.BLL.Search.Criteria.Recipe.Handlers;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Recipe;

[ExtendObjectType(typeof(Query))]
public class QueryRecipesResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Recipe> GetRecipesOffset(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Recipe> GetRecipesCursor(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Recipe> GetRecipeById(ReciperContext context, Guid RecipeId)
    {
        return context.Recipes.AsNoTracking().Where(recipe => recipe.Id == RecipeId);
    }

    private IQueryable<DAL.Models.Recipe> QueryHandler(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria
    )
    {
        var queryHandlerChain = new SearchCriteriaHandlerChainBuilder<
            ReciperContext,
            RecipeSearchCriteria,
            DAL.Models.Recipe
        >().BuildChain(
            [
                new RecipeSearchCriteriaOverallMatchingHandler(),
                new RecipeSearchCriteriaRatingHandler(),
            ]
        );

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}
