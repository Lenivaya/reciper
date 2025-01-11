using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Tag;

[ExtendObjectType(typeof(Query))]
public class QueryTagsResolver
{
    [UseOffsetPaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Tag> GetTagsOffset(ReciperContext context)
    {
        return context.Tags.AsNoTracking();
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Tag> GetTagsCursor(ReciperContext context)
    {
        return context.Tags.AsNoTracking();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Tag> GetTagById(ReciperContext context, Guid tagId)
    {
        return context.Tags.AsNoTracking().Where(tag => tag.Id == tagId);
    }
}
