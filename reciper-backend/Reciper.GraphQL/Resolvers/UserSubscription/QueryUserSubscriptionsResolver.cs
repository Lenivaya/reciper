using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.UserSubscription;

[ExtendObjectType(typeof(Query))]
public class QueryUserSubscriptionsResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionsOffset(
        ReciperContext context,
        Guid userId
    )
    {
        return context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscriberId == userId);
    }

    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscribersOffset(
        ReciperContext context,
        Guid userId
    )
    {
        return context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscribeeId == userId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionsCursor(
        ReciperContext context,
        Guid userId
    )
    {
        return context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscriberId == userId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscribersCursor(
        ReciperContext context,
        Guid userId
    )
    {
        return context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscribeeId == userId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionById(
        ReciperContext context,
        Guid subscriptionId
    )
    {
        return context.UserSubscriptions.AsNoTracking().Where(sub => sub.Id == subscriptionId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionByCompositeKey(
        ReciperContext context,
        Guid subscriberId,
        Guid subscribeeId
    )
    {
        return context
            .UserSubscriptions.AsNoTracking()
            .Where(sub => sub.SubscriberId == subscriberId && sub.SubscribeeId == subscribeeId);
    }
}
