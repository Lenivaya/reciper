using Microsoft.EntityFrameworkCore;
using Reciper.DAL;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaRatingHandler
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

        if (searchCriteria.MinRating.HasValue)
        {
            query = query
                .Include(r => r.Ratings)
                .Where(r =>
                    r.Ratings.Average(rating => rating.Value) >= searchCriteria.MinRating.Value
                );
        }

        if (searchCriteria.MaxRating.HasValue)
        {
            query = query
                .Include(r => r.Ratings)
                .Where(r =>
                    r.Ratings.Average(rating => rating.Value) <= searchCriteria.MaxRating.Value
                );
        }

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
