using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.User.Handlers;

public class UserSearchCriteriaOverallMatchingHandler
    : SearchCriteriaQueryHandler<ReciperContext, UserSearchCriteria, DAL.Models.User>
{
    public override IQueryable<DAL.Models.User> HandleQuery(
        ReciperContext context,
        UserSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.User>? query = null
    )
    {
        query ??= context.Users.AsQueryable();

        if (string.IsNullOrWhiteSpace(searchCriteria?.Matching))
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        var searchTerm = searchCriteria.Matching.ToLower();

        query = query.Include(u => u.Recipes).ThenInclude(r => r.RecipeTags);
        query = query.Include(u => u.Recipes).ThenInclude(r => r.RecipeIngredients);

        query = query.Where(u =>
            u.Username.ToLower().Contains(searchTerm)
            || u.Bio.ToLower().Contains(searchTerm)
            || u.Email.ToLower().Contains(searchTerm)
            || u.Recipes
                .Any(r =>
                    (r.Title.ToLower().Contains(searchTerm) || searchTerm.ToLower().Contains(r.Title.ToLower())) ||
                    (r.Description.ToLower().Contains(searchTerm) ||
                     searchTerm.ToLower().Contains(r.Description.ToLower())) ||
                    r.RecipeTags.Any(rt =>
                        rt.Tag.Name.ToLower().Contains(searchTerm) ||
                        searchTerm.ToLower().Contains(rt.Tag.Name.ToLower())
                    ) ||
                    r.RecipeIngredients.Any(recipeIngredient =>
                        recipeIngredient.Ingredient.Name.ToLower().Contains(searchTerm) ||
                        searchTerm.ToLower().Contains(recipeIngredient.Ingredient.Name.ToLower())
                    )
                )
        );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}