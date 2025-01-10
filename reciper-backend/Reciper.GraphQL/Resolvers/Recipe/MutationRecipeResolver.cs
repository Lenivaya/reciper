using HotChocolate.Subscriptions;
using MapsterMapper;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Recipe;

[ExtendObjectType(typeof(Mutation))]
public class MutationRecipesResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Recipe,
        Guid,
        RecipeCreateDTO,
        RecipePatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.RecipesRepository);

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Recipe?> AddRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        RecipeCreateDTO createDto
    )
    {
        return GraphQlMutationResolverService.AddEntity(unitOfWork, mapper, createDto);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Recipe?> DeleteRecipeById(ReciperUnitOfWork unitOfWork, Guid recipeId)
    {
        return GraphQlMutationResolverService.DeleteEntity(unitOfWork, recipeId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Recipe?> UpdateRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        ITopicEventSender sender,
        Guid RecipeId,
        RecipePatchDTO updateDto
    )
    {
        return GraphQlMutationResolverService.UpdateEntity(
            unitOfWork,
            mapper,
            RecipeId,
            updateDto,
            OnSuccess
        );

        async void OnSuccess(DAL.Models.Recipe result) =>
            await sender.SendAsync(
                $"{nameof(SubscriptionRecipesResolver.RecipeUpdated)}-{RecipeId}",
                result.Id
            );
    }
}