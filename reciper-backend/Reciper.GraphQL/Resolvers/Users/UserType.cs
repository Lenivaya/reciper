using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;

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

    public async Task<int> GetLikesCount(
        ReciperContext context,
        [Parent] User user
    )
    {
        return await context.RecipeLikes.CountAsync(like => like.UserId == user.Id);
    }

    public async Task<int> GetTotalRecipesLikes(
        ReciperContext context,
        [Parent] User user
    )
    {
        return await context.RecipeLikes.Include(rl => rl.Recipe)
            .CountAsync(like => like.Recipe.UserId == user.Id);
    }

    public async Task<bool> IsSubscribed(
        ReciperContext context,
        [Parent] User user,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        if (authenticatedUser == null)
            return false;

        return await context.UserSubscriptions.AnyAsync(sub =>
            sub.SubscriberId == authenticatedUser.UserId && sub.SubscribeeId == user.Id);
    }
}