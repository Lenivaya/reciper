using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Users;

public class UserType : ObjectTypeExtension<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Ignore(f => f.PasswordHash);
    }
}

[ExtendObjectType(typeof(Query))]
public class QueryUsersResolver
{
    [UseSingleOrDefault]
    [UseProjection]
    public IQueryable<User>? GetMe(
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        ReciperContext context
    )
    {
        return authenticatedUser == null
            ? null
            : context
                .Users.AsNoTracking()
                .Where(seeker => seeker.Id == authenticatedUser.UserId);
    }
}