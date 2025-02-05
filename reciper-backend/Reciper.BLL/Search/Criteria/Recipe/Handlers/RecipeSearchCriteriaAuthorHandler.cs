using Microsoft.EntityFrameworkCore;
using Reciper.DAL;
using Reciper.DAL.Models;

namespace Reciper.BLL.Search.Criteria.Recipe.Handlers;

public class RecipeSearchCriteriaAuthorHandler
    : SearchCriteriaQueryHandler<ReciperContext, RecipeSearchCriteria, DAL.Models.Recipe>
{
    public override IQueryable<DAL.Models.Recipe> HandleQuery(
        ReciperContext context,
        RecipeSearchCriteria? criteria,
        IQueryable<DAL.Models.Recipe>? query = null
    )
    {
        query ??= context.Recipes;

        if (criteria?.AuthorId is null)
        {
            return Next?.HandleQuery(context, criteria, query) ?? query;
        }

        query = query.Where(recipe => recipe.UserId == criteria.AuthorId);

        return Next?.HandleQuery(context, criteria, query) ?? query;
    }
}
