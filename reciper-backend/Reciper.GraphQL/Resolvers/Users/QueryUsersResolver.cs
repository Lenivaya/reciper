using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.User;
using Reciper.BLL.Search.Criteria.User.Handlers;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Users;

[ExtendObjectType(typeof(Query))]
public class QueryUsersResolver
{
    [UseProjection]
    [UseFirstOrDefault]
    public IQueryable<User>? GetMe(ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return authenticatedUser is null
            ? null
            : context.Users.AsNoTracking().Where(user => user.Id == authenticatedUser.UserId);
    }

    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<User> GetUsersOffset(
        ReciperContext context,
        UserSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<User> GetUsersCursor(
        ReciperContext context,
        UserSearchCriteria? searchCriteria
    )
    {
        return QueryHandler(context, searchCriteria);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<User> GetUserById(ReciperContext context, Guid userId)
    {
        return context.Users.AsNoTracking().Where(user => user.Id == userId);
    }

    private IQueryable<User> QueryHandler(
        ReciperContext context,
        UserSearchCriteria? searchCriteria
    )
    {
        var queryHandlerChain = new SearchCriteriaHandlerChainBuilder<
            ReciperContext,
            UserSearchCriteria,
            User
        >().BuildChain(
            [
                new UserSearchCriteriaOverallMatchingHandler(),
                new UserSearchCriteriaRecipeStatsHandler(),
                new UserSearchCriteriaRegistrationHandler(),
                new UserSearchCriteriaRecipeTagsHandler()
            ]
        );

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}
