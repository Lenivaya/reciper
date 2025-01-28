using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Ingredient.Handlers;

public class IngredientSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, IngredientSearchCriteria, DAL.Models.Ingredient>
{
    public override IQueryable<DAL.Models.Ingredient> HandleQuery(
        ReciperContext context,
        IngredientSearchCriteria? criteria,
        IQueryable<DAL.Models.Ingredient>? query = null
    )
    {
        query ??= context.Ingredients;

        if (string.IsNullOrWhiteSpace(criteria?.OverallMatching))
            return query;

        var patterns = criteria
            .OverallMatching.Split(' ')
            .Select(word => $"%{word.ToLower()}%")
            .ToArray();

        return query.Where(ingredient =>
            patterns.All(pattern => EF.Functions.Like(ingredient.Name.ToLower(), pattern))
        );
    }
}
