using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Rating;

[ExtendObjectType(typeof(Query))]
public class QueryRatingsResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Rating> GetRatingsOffset(
        ReciperContext context,
        Guid recipeId
    )
    {
        return QueryHandler(context, recipeId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Rating> GetRatingsCursor(
        ReciperContext context,
        Guid recipeId
    )
    {
        return QueryHandler(context, recipeId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Rating> GetRatingById(ReciperContext context, Guid ratingId)
    {
        return context.Ratings.AsNoTracking().Where(rating => rating.Id == ratingId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Rating> GetRatingByCompositeKey(ReciperContext context, Guid recipeId, Guid userId)
    {
        return context.Ratings.AsNoTracking().Where(rating => rating.RecipeId == recipeId && rating.UserId == userId);
    }


    private IQueryable<DAL.Models.Rating> QueryHandler(
        ReciperContext context,
        Guid recipeId
    )
    {
        return context.Ratings.AsNoTracking().Where(rating => rating.RecipeId == recipeId);
    }
}