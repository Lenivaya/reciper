using HotChocolate.Authorization;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.RecipeLike;

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationRecipeLikesResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.RecipeLike,
        Guid,
        object,
        object
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.RecipeLikesRepository);

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<DAL.Models.RecipeLike> LikeRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId
    )
    {
        try
        {
            var like = new DAL.Models.RecipeLike
            {
                UserId = authenticatedUser!.UserId,
                RecipeId = recipeId,
            };

            var success = await unitOfWork.RecipeLikesRepository.Insert(like);
            if (!success)
                throw new ReciperException("Failed to create like");

            await unitOfWork.SaveChanges();
            return like;
        }
        catch (DbUpdateException e)
            when (e.InnerException is SqlException
                  && e.InnerException.Message.Contains("duplicate key")
                 )
        {
            throw new ReciperException("Recipe is already liked");
        }
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.RecipeLike?> UnlikeRecipe(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId
    )
    {
        var like = await unitOfWork
            .RecipeLikesRepository.StartQuery()
            .Where(l => l.UserId == authenticatedUser!.UserId && l.RecipeId == recipeId)
            .FirstOrDefaultAsync();

        if (like is null)
            throw new ReciperException("Like not found");

        var success = await unitOfWork.RecipeLikesRepository.Delete(like.Id);
        if (!success)
            throw new ReciperException("Failed to delete like");

        await unitOfWork.SaveChanges();
        return like;
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.RecipeLike?> DeleteLikeById(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid likeId
    )
    {
        if (!await IsLikeOwner(likeId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to delete this like");

        return await GraphQlMutationResolverService.DeleteEntity(unitOfWork, likeId);
    }

    private static async Task<bool> IsLikeOwner(
        Guid likeId,
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
               && await unitOfWork
                   .RecipeLikesRepository.StartQuery()
                   .AsNoTracking()
                   .AnyAsync(like => like.Id == likeId && like.UserId == authenticatedUser.UserId);
    }
}