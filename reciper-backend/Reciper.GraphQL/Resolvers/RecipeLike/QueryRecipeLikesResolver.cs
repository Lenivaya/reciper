using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.RecipeLike;

[ExtendObjectType(typeof(Query))]
public class QueryRecipeLikesResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetUserLikesOffset(
        ReciperContext context,
        Guid userId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.UserId == userId);
    }

    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetRecipeLikesOffset(
        ReciperContext context,
        Guid recipeId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.RecipeId == recipeId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetUserLikesCursor(
        ReciperContext context,
        Guid userId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.UserId == userId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.RecipeLike> GetRecipeLikesCursor(
        ReciperContext context,
        Guid recipeId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.RecipeId == recipeId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.RecipeLike> GetLikeById(
        ReciperContext context,
        Guid likeId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.Id == likeId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.RecipeLike> GetLikeByCompositeKey(
        ReciperContext context,
        Guid userId,
        Guid recipeId
    )
    {
        return context.RecipeLikes.AsNoTracking()
            .Where(like => like.UserId == userId && like.RecipeId == recipeId);
    }
}