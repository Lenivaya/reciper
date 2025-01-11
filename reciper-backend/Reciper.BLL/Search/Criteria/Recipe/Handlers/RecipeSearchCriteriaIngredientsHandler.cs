using Microsoft.EntityFrameworkCore;
using Reciper.DAL;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaIngredientsHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes.AsQueryable();

        if (searchCriteria?.IngredientNames is null or { Length: 0 })
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        query = query
            .Include(r => r.RecipeIngredients)
            .ThenInclude(ri => ri.Ingredient)
            .Where(r =>
                r.RecipeIngredients.Any(ri =>
                    searchCriteria.IngredientNames.Contains(ri.Ingredient.Name)
                )
            );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}