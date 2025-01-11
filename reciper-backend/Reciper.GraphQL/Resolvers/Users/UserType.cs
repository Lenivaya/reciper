using Reciper.DAL.Models;

namespace Reciper.GraphQL.Resolvers.Users;

public class UserType : ObjectTypeExtension<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Ignore(f => f.PasswordHash).Ignore(f => f.Email);
    }
}
