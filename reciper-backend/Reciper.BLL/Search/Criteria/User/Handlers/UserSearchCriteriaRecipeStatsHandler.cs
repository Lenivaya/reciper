using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.User.Handlers;

public class UserSearchCriteriaRecipeStatsHandler
    : SearchCriteriaQueryHandler<ReciperContext, UserSearchCriteria, DAL.Models.User>
{
    public override IQueryable<DAL.Models.User> HandleQuery(
        ReciperContext context,
        UserSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.User>? query = null
    )
    {
        query ??= context.Users.AsQueryable();

        if (searchCriteria is null)
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        query = searchCriteria.HasPublishedRecipes switch
        {
            true => query.Include(u => u.Recipes).Where(u => u.Recipes.Any()),
            false => query.Include(u => u.Recipes).Where(u => !u.Recipes.Any()),
            _ => query
        };

        if (searchCriteria.MinRecipesCount.HasValue || searchCriteria.MaxRecipesCount.HasValue)
        {
            query = query.Include(u => u.Recipes);

            if (searchCriteria.MinRecipesCount.HasValue)
            {
                query = query.Where(u => u.Recipes.Count >= searchCriteria.MinRecipesCount.Value);
            }

            if (searchCriteria.MaxRecipesCount.HasValue)
            {
                query = query.Where(u => u.Recipes.Count <= searchCriteria.MaxRecipesCount.Value);
            }
        }

        if (searchCriteria.MinAverageRating.HasValue || searchCriteria.MaxAverageRating.HasValue)
        {
            query = query
                .Include(u => u.Recipes)
                .ThenInclude(r => r.Ratings);

            if (searchCriteria.MinAverageRating.HasValue)
            {
                query = query.Where(u =>
                    u.Recipes.Any() &&
                    u.Recipes.Average(r =>
                        r.Ratings.Any() ? r.Ratings.Average(rating => rating.Value) : 0
                    ) >= searchCriteria.MinAverageRating.Value
                );
            }

            if (searchCriteria.MaxAverageRating.HasValue)
            {
                query = query.Where(u =>
                    !u.Recipes.Any() ||
                    u.Recipes.Average(r =>
                        r.Ratings.Any() ? r.Ratings.Average(rating => rating.Value) : 0
                    ) <= searchCriteria.MaxAverageRating.Value
                );
            }
        }

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}