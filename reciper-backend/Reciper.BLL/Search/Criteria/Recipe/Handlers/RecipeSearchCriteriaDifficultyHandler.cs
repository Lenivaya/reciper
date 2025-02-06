using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaDifficultyHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes.AsQueryable();

        if (searchCriteria?.DifficultyLevels is null or { Length: 0 })
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var patterns = searchCriteria.DifficultyLevels.Select(dl => dl.ToString().ToLower());

        query = query.Where(r =>
            patterns.Any(pattern => r.DifficultyLevel.ToString().ToLower().Contains(pattern))
        );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
