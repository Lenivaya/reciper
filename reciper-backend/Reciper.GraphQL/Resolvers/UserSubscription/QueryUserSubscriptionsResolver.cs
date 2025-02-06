using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.UserSubscription;
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
        Guid userId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria).Where(sub => sub.SubscriberId == userId);
    }

    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscribersOffset(
        ReciperContext context,
        Guid userId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria).Where(sub => sub.SubscribeeId == userId);
    }

    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscriptionsOffset(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : QueryHandler(context, searchCriteria)
                .Where(sub => sub.SubscriberId == authenticatedUser.UserId);
    }

    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscribersOffset(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : QueryHandler(context, searchCriteria)
                .Where(sub => sub.SubscribeeId == authenticatedUser.UserId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionsCursor(
        ReciperContext context,
        Guid userId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria).Where(sub => sub.SubscriberId == userId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetSubscribersCursor(
        ReciperContext context,
        Guid userId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria).Where(sub => sub.SubscribeeId == userId);
    }

    [Authorize]
    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscriptionsCursor(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : QueryHandler(context, searchCriteria)
                .Where(sub => sub.SubscriberId == authenticatedUser.UserId);
    }

    [Authorize]
    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscribersCursor(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser == null
            ? new List<DAL.Models.UserSubscription>().AsQueryable()
            : QueryHandler(context, searchCriteria)
                .Where(sub => sub.SubscribeeId == authenticatedUser.UserId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionById(
        ReciperContext context,
        Guid subscriptionId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria).Where(sub => sub.Id == subscriptionId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetSubscriptionByCompositeKey(
        ReciperContext context,
        Guid subscriberId,
        Guid subscribeeId,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria)
            .Where(sub => sub.SubscriberId == subscriberId && sub.SubscribeeId == subscribeeId);
    }

    [Authorize]
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.UserSubscription> GetMySubscription(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid otherUserId
    )
    {
        if (authenticatedUser == null)
            return new List<DAL.Models.UserSubscription>().AsQueryable();

        return QueryHandler(context, searchCriteria)
            .Where(userSubscription =>
                userSubscription.SubscriberId == authenticatedUser.UserId
                && userSubscription.SubscribeeId == otherUserId
            );
    }

    private IQueryable<DAL.Models.UserSubscription> QueryHandler(
        ReciperContext context,
        UserSubscriptionSearchCriteria? searchCriteria
    )
    {
        var queryHandlerChain = new SearchCriteriaHandlerChainBuilder<
            ReciperContext,
            UserSubscriptionSearchCriteria,
            DAL.Models.UserSubscription
        >().BuildChain([new UserSubscriptionSearchCriteriaOverallMatchingHandler()]);

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}
