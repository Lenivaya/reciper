using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.User.Handlers;

public class UserSearchCriteriaRecipeTagsHandler
    : SearchCriteriaQueryHandler<ReciperContext, UserSearchCriteria, DAL.Models.User>
{
    public override IQueryable<DAL.Models.User> HandleQuery(
        ReciperContext context,
        UserSearchCriteria? searchCriteria,
        IQueryable<DAL.Models.User>? query = null
    )
    {
        query ??= context.Users.AsQueryable();

        if (searchCriteria?.RecipeTagNames is null or { Length: 0 })
            return Next?.HandleQuery(context, searchCriteria, query) ?? query;

        query = query
            .Include(u => u.Recipes)
            .ThenInclude(r => r.RecipeTags)
            .ThenInclude(rt => rt.Tag)
            .Where(u =>
                u.Recipes.Any(r =>
                    r.RecipeTags.Any(rt =>
                        searchCriteria.RecipeTagNames.Any(tagName =>
                            tagName.Contains(rt.Tag.Name) || rt.Tag.Name.Contains(tagName)
                        )
                    )
                )
            );

        return Next?.HandleQuery(context, searchCriteria, query) ?? query;
    }
}
