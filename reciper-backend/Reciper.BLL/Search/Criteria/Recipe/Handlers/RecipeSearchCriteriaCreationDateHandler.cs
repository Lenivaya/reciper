using Microsoft.EntityFrameworkCore;
using Reciper.DAL;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaCreationDateHandler
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

        if (searchCriteria.CreatedAfter.HasValue)
        {
            query = query.Where(r => r.CreatedAt >= searchCriteria.CreatedAfter.Value);
        }

        if (searchCriteria.CreatedBefore.HasValue)
        {
            query = query.Where(r => r.CreatedAt <= searchCriteria.CreatedBefore.Value);
        }

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}