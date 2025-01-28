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

        if (string.IsNullOrWhiteSpace(searchCriteria?.Matching))
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var patterns = searchCriteria.Matching.Split(' ').Select(word => $"%{word}%").ToArray();

        query = query
            .Include(r => r.User)
            .Include(r => r.RecipeTags)
            .ThenInclude(t => t.Tag)
            .Include(r => r.RecipeIngredients)
            .ThenInclude(i => i.Ingredient)
            .Where(r =>
                patterns.All(pattern =>
                    EF.Functions.Like(r.User.Username, pattern)
                    || EF.Functions.Like(r.Title.ToLower(), pattern)
                    || EF.Functions.Like(r.Description.ToLower(), pattern)
                    || EF.Functions.Like(r.Instructions.ToLower(), pattern)
                    || r.RecipeTags.Any(t => EF.Functions.Like(t.Tag.Name.ToLower(), pattern))
                    || r.RecipeIngredients.Any(i =>
                        EF.Functions.Like(i.Ingredient.Name.ToLower(), pattern)
                    )
                    || r.DifficultyLevel.ToString().ToLower().Contains(pattern.ToLower())
                    || pattern.ToLower().Contains(r.DifficultyLevel.ToString().ToLower())
                )
            );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
