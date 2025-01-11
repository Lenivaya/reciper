using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.User.Handlers;

public class UserSearchCriteriaRegistrationHandler
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

        if (searchCriteria.RegisteredAfter.HasValue)
            query = query.Where(u => u.CreatedAt >= searchCriteria.RegisteredAfter.Value);

        if (searchCriteria.RegisteredBefore.HasValue)
            query = query.Where(u => u.CreatedAt <= searchCriteria.RegisteredBefore.Value);

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
