using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.Recipe;
using Reciper.BLL.Search.Criteria.Recipe.Handlers;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
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


    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Recipe> GetMyRecipesOffset(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.Recipe>().AsQueryable()
            : QueryHandler(context, searchCriteria).Where(r => r.UserId == authenticatedUser.UserId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Recipe> GetMyRecipesCursor(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.Recipe>().AsQueryable()
            : QueryHandler(context, searchCriteria).Where(r => r.UserId == authenticatedUser.UserId);
    }


    /// <summary>
    /// Returns recipes liked by user and saved for the future
    /// </summary>
    /// <param name="context"></param>
    /// <param name="searchCriteria"></param>
    /// <param name="authenticatedUser"></param>
    /// <returns></returns>
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Recipe> GetMySavedRecipesOffset(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.Recipe>().AsQueryable()
            : QueryHandler(context, searchCriteria)
                .Include(r => r.Likes)
                .Where(r => r.Likes.Any(l => l.UserId == authenticatedUser.UserId));
        ;
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Recipe> GetRecipeById(ReciperContext context, Guid recipeId)
    {
        return context.Recipes.AsNoTracking().Where(recipe => recipe.Id == recipeId);
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
                new RecipeSearchCriteriaCookingTimeHandler(),
                new RecipeSearchCriteriaCreationDateHandler(),
                new RecipeSearchCriteriaTagsHandler(),
                new RecipeSearchCriteriaDifficultyHandler(),
                new RecipeSearchCriteriaIngredientsHandler(),
                new RecipeSearchCriteriaRatingHandler(),
            ]
        );

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}