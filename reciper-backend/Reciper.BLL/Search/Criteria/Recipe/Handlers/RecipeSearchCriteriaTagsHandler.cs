using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaTagsHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes.AsQueryable();

        if (searchCriteria?.Tags is null or { Length: 0 })
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var patterns = searchCriteria.Tags.Select(tag => $"%{tag.ToLower()}%").ToArray();

        query = query
            .Include(r => r.RecipeTags)
            .Where(r =>
                patterns.All(pattern =>
                    r.RecipeTags.Any(t => EF.Functions.Like(t.Tag.Name.ToLower(), pattern))
                )
            );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
