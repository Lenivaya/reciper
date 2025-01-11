using Microsoft.EntityFrameworkCore;
using Reciper.DAL;
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

        query = query
            .Include(r => r.RecipeTags)
            .Where(r => r.RecipeTags.Any(t =>
                searchCriteria.Tags.Any(searchTag =>
                    searchTag.Contains(t.Tag.Name) || t.Tag.Name.Contains(searchTag))));

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}