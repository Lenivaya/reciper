using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaCookingTimeHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes.AsQueryable();

        if (searchCriteria is null)
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        if (searchCriteria.MinCookingTime.HasValue)
        {
            query = query.Where(r => r.CookingTimeMinutes >= searchCriteria.MinCookingTime.Value);
        }

        if (searchCriteria.MaxCookingTime.HasValue)
        {
            query = query.Where(r => r.CookingTimeMinutes <= searchCriteria.MaxCookingTime.Value);
        }

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}