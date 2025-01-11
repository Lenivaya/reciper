using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Comment;

[ExtendObjectType(typeof(Query))]
public class QueryCommentsResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Comment> GetCommentsOffset(ReciperContext context, Guid recipeId)
    {
        return QueryHandler(context, recipeId);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Comment> GetCommentsCursor(ReciperContext context, Guid recipeId)
    {
        return QueryHandler(context, recipeId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Comment> GetCommentById(ReciperContext context, Guid commentId)
    {
        return context.Comments.AsNoTracking().Where(comment => comment.Id == commentId);
    }

    private IQueryable<DAL.Models.Comment> QueryHandler(ReciperContext context, Guid recipeId)
    {
        return context.Comments.AsNoTracking().Where(comment => comment.RecipeId == recipeId);
    }
}
