using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.RecipeLike;

[ExtendObjectType(typeof(Query))]
public class QueryRecipeLikesResolver
{
    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetUserLikesOffset(ReciperContext context, Guid userId)
    {
        return context.RecipeLikes.AsNoTracking().Where(like => like.UserId == userId);
    }

    [Authorize]
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetRecipeLikesOffset(
        ReciperContext context,
        Guid recipeId
    )
    {
        return context.RecipeLikes.AsNoTracking().Where(like => like.RecipeId == recipeId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    [Authorize]
    public IQueryable<DAL.Models.RecipeLike> GetUserLikesCursor(ReciperContext context, Guid userId)
    {
        return context.RecipeLikes.AsNoTracking().Where(like => like.UserId == userId);
    }

    [Authorize]
    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetRecipeLikesCursor(
        ReciperContext context,
        Guid recipeId
    )
    {
        return context.RecipeLikes.AsNoTracking().Where(like => like.RecipeId == recipeId);
    }

    [Authorize]
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.RecipeLike> GetLikeById(ReciperContext context, Guid likeId)
    {
        return context.RecipeLikes.AsNoTracking().Where(like => like.Id == likeId);
    }

    [Authorize]
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.RecipeLike> GetMyRecipeLike(
        ReciperContext context,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId
    )
    {
        if (authenticatedUser == null)
            return new List<DAL.Models.RecipeLike>().AsQueryable();

        return context
            .RecipeLikes.AsNoTracking()
            .Where(like => like.UserId == authenticatedUser.UserId && like.RecipeId == recipeId);
    }
}