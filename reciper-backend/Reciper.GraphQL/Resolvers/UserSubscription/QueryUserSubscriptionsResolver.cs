using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
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

    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscriptionsOffset(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscriberId == authenticatedUser.UserId);
    }


    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscribersOffset(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscribeeId == authenticatedUser.UserId);
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


    [Authorize]
    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscriptionsCursor(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscriberId == authenticatedUser.UserId);
    }


    [Authorize]
    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscribersCursor(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : context.UserSubscriptions.AsNoTracking().Where(sub => sub.SubscribeeId == authenticatedUser.UserId);
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


    [Authorize]
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscription(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid otherUserId
    )
    {
        if (authenticatedUser == null)
            return new List<DAL.Models.UserSubscription>().AsQueryable();

        return context
            .UserSubscriptions.AsNoTracking()
            .Where(userSubscription => userSubscription.SubscriberId == authenticatedUser.UserId &&
                                       userSubscription.SubscribeeId == otherUserId);
    }
}