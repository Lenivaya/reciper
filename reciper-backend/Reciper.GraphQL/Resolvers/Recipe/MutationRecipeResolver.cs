using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Recipe;

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationRecipesResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Recipe,
        Guid,
        RecipeCreateDTO,
        RecipePatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.RecipesRepository);

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.Recipe>> AddRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        RecipeCreateDTO createDto
    )
    {
        var repo = unitOfWork.RecipesRepository;
        var entity = mapper.Map<DAL.Models.Recipe>(createDto);
        entity.UserId = authenticatedUser!.UserId;
        var success = await repo.Insert(entity);
        if (!success)
            throw new ReciperException("Failed to insert entity");

        await unitOfWork.SaveChanges();
        return unitOfWork
            .RecipesRepository.StartQuery()
            .AsNoTracking()
            .Where(r => r.Id == entity.Id);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Recipe?> DeleteRecipeById(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId
    )
    {
        if (!await IsAuthor(recipeId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to delete this recipe");

        return await GraphQlMutationResolverService.DeleteEntity(unitOfWork, recipeId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Recipe?> UpdateRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        ITopicEventSender sender,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId,
        RecipePatchDTO updateDto
    )
    {
        if (!await IsAuthor(recipeId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to update this recipe");

        return await GraphQlMutationResolverService.UpdateEntity(
            unitOfWork,
            mapper,
            recipeId,
            updateDto,
            OnSuccess
        );

        async void OnSuccess(DAL.Models.Recipe result)
        {
            await sender.SendAsync(
                $"{nameof(SubscriptionRecipesResolver.RecipeUpdated)}-{recipeId}",
                result.Id
            );
        }
    }

    private static async Task<bool> IsAuthor(
        Guid recipeId,
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
            && await unitOfWork
                .RecipesRepository.StartQuery()
                .AsNoTracking()
                .AnyAsync(recipe =>
                    recipe.Id == recipeId && recipe.UserId == authenticatedUser.UserId
                );
    }
}
