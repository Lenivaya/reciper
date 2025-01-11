using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes.AsQueryable();

        if (searchCriteria?.Matching is null)
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var patterns = searchCriteria.Matching.Split(' ').Select(word => $"%{word}%").ToArray();

        query = query
            .Include(r => r.RecipeTags)
            .ThenInclude(t => t.Tag)
            .Include(r => r.RecipeIngredients)
            .ThenInclude(i => i.Ingredient)
            .Where(r =>
                patterns.All(pattern =>
                    r.Title.ToLower().Contains(pattern.ToLower())
                    || r.Description.ToLower().Contains(pattern.ToLower())
                    || r.Instructions.ToLower().Contains(pattern.ToLower())
                    || r.RecipeTags.Any(t => t.Tag.Name.ToLower().Contains(pattern.ToLower()))
                    || r.RecipeIngredients.Any(i =>
                        i.Ingredient.Name.ToLower().Contains(pattern.ToLower())
                    )
                )
            );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
