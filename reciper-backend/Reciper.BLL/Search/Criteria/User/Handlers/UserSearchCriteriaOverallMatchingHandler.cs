using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.User.Handlers;

public class UserSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, UserSearchCriteria, DAL.Models.User>
{
    public override IQueryable<DAL.Models.User> HandleQuery(
        ReciperContext context,
        UserSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.User>? query = null
    )
    {
        query ??= context.Users.AsQueryable();

        if (string.IsNullOrWhiteSpace(searchCriteria?.Matching))
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var searchTerm = searchCriteria.Matching.ToLower();
        query = query.Where(u =>
            u.Username.ToLower().Contains(searchTerm)
            || u.Bio.ToLower().Contains(searchTerm)
            || u.Email.ToLower().Contains(searchTerm)
            || u.Recipes.Any(r => r.Title.ToLower().Contains(searchTerm))
        );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
