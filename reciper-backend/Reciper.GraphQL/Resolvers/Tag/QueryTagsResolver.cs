using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Search;
using Reciper.BLL.Search.Criteria.Tag;
using Reciper.BLL.Search.Criteria.Tag.Handlers;
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
    public IQueryable<DAL.Models.Tag> GetTagsOffset(
        ReciperContext context,
        TagSearchCriteria? searchCriteria)
    {
        return QueryHandler(context, searchCriteria);
    }

    [UsePaging(MaxPageSize = 50, IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DAL.Models.Tag> GetTagsCursor(
        ReciperContext context,
        TagSearchCriteria? searchCriteria)
    {
        return QueryHandler(context, searchCriteria);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Tag> GetTagById(ReciperContext context, Guid tagId)
    {
        return context.Tags.AsNoTracking().Where(tag => tag.Id == tagId);
    }

    private IQueryable<DAL.Models.Tag> QueryHandler(
        ReciperContext context,
        TagSearchCriteria? searchCriteria)
    {
        var queryHandlerChain = new SearchCriteriaHandlerChainBuilder<
            ReciperContext,
            TagSearchCriteria,
            DAL.Models.Tag
        >().BuildChain(
            [
                new TagSearchCriteriaOverallMatchingHandler()
            ]
        );

        return queryHandlerChain.HandleQuery(context, searchCriteria).AsNoTracking();
    }
}