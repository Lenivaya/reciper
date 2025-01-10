using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Recipe;

[ExtendObjectType(typeof(Subscription))]
public class SubscriptionRecipesResolver
{
    [Subscribe]
    [Topic($"{nameof(RecipeUpdated)}-{{{nameof(recipeId)}}}")]
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<DAL.Models.Recipe> RecipeUpdated(
        ReciperContext context,
        Guid recipeId,
        [EventMessage] Guid messageRecipeId
    )
    {
        return context
                .Recipes.AsNoTracking()
                .Where(r => r.Id == messageRecipeId)
            ;
    }
}