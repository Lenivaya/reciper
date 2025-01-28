using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Tag.Handlers;

public class TagSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, TagSearchCriteria, DAL.Models.Tag>
{
    public override IQueryable<DAL.Models.Tag> HandleQuery(
        ReciperContext context,
        TagSearchCriteria? criteria,
        IQueryable<DAL.Models.Tag>? query = null
    )
    {
        query ??= context.Tags;

        if (string.IsNullOrWhiteSpace(criteria?.OverallMatching))
            return query;

        var patterns = criteria
            .OverallMatching.Split(' ')
            .Select(word => $"%{word.ToLower()}%")
            .ToArray();

        return query.Where(tag =>
            patterns.All(pattern => EF.Functions.Like(tag.Name.ToLower(), pattern))
        );
    }
}
