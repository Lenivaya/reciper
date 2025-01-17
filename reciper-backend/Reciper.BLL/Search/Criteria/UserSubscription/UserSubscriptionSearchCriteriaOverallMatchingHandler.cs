using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.UserSubscription;

public class UserSubscriptionSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, UserSubscriptionSearchCriteria, DAL.Models.UserSubscription>
{
    public override IQueryable<DAL.Models.UserSubscription> HandleQuery(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.UserSubscription>? query = null
    )
    {
        query ??= context.UserSubscriptions.AsQueryable();

        if (string.IsNullOrWhiteSpace(searchCriteria?.Matching))
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var searchTerm = searchCriteria.Matching.ToLower();

        query = query.Include(us => us.Subscribee).Include(us => us.Subscriber);

        query = query.Where(u =>
            EF.Functions.Like(u.Subscribee.Username, $"%{searchTerm}%") ||
            EF.Functions.Like(u.Subscribee.Bio, $"%{searchTerm}%") ||
            EF.Functions.Like(u.Subscriber.Username, $"%{searchTerm}%") ||
            EF.Functions.Like(u.Subscriber.Bio, $"%{searchTerm}%")
        );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}