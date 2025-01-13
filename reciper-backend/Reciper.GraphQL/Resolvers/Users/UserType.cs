using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.GraphQL.Resolvers.Users;

public class UserType : ObjectTypeExtension<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Ignore(f => f.PasswordHash).Ignore(f => f.Email);
    }
}

[ExtendObjectType(typeof(User))]
public class UserQueryExtensions
{
    public async Task<int> GetRecipesCount(
        ReciperContext context,
        [Parent] User user
    )
    {
        return await context.Recipes.CountAsync(recipe => recipe.UserId == user.Id);
    }

    public async Task<int> GetSubscribersCount(
        ReciperContext context,
        [Parent] User user
    )
    {
        return await context.UserSubscriptions.CountAsync(subscription => subscription.SubscribeeId == user.Id);
    }
}