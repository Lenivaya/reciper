using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Rating;

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationRatingsResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Rating,
        Guid,
        RatingCreateDTO,
        RatingPatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.RatingsRepository);

    /// <summary>
    /// Upserts rating for the authenricated user and givne recipe
    /// </summary>
    /// <param name="unitOfWork"></param>
    /// <param name="authenticatedUser"></param>
    /// <param name="recipeId"></param>
    /// <returns></returns>
    /// <exception cref="ReciperException"></exception>
    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Rating?> UpsertRecipeRating(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        RatingCreateDTO createDto
    )
    {
        try
        {
            if (authenticatedUser == null)
                throw new ReciperException("User not authenticated");

            var existingRating = await unitOfWork
                .RatingsRepository.StartQuery()
                .Where(rating =>
                    rating.UserId == authenticatedUser.UserId
                    && rating.RecipeId == createDto.RecipeId
                )
                .FirstOrDefaultAsync();

            if (existingRating != null)
            {
                existingRating.Value = createDto.Value;
                unitOfWork.RatingsRepository.Update(existingRating);
                await unitOfWork.SaveChanges();
                return existingRating;
            }
            else
            {
                var rating = mapper.Map<DAL.Models.Rating>(createDto);
                rating.UserId = authenticatedUser.UserId;
                rating.RecipeId = createDto.RecipeId;
                var success = await unitOfWork.RatingsRepository.Insert(rating);
                if (!success)
                    throw new ReciperException("Failed to insert rating");

                await unitOfWork.SaveChanges();
                return rating;
            }

            throw new ReciperException("Failed to upsert rating");
        }
        catch (DbUpdateException e)
        {
            throw new ReciperException("Failed to upsert rating");
        }
    }

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.Rating>> AddRating(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        RatingCreateDTO createDto
    )
    {
        try
        {
            var repo = unitOfWork.RatingsRepository;
            var entity = mapper.Map<DAL.Models.Rating>(createDto);
            entity.UserId = authenticatedUser!.UserId;
            var success = await repo.Insert(entity);
            if (!success)
                throw new ReciperException("Failed to insert entity");

            await unitOfWork.SaveChanges();
            return unitOfWork
                .RatingsRepository.StartQuery()
                .AsNoTracking()
                .Where(r => r.Id == entity.Id);
        }
        catch (DbUpdateException e)
            when (e.InnerException is SqlException
                && e.InnerException.Message.Contains("duplicate key")
            )
        {
            throw new ReciperException("Rating already exists");
        }
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Rating?> UpdateRatingById(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        ITopicEventSender sender,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid ratingId,
        RatingPatchDTO patchDto
    )
    {
        if (!await IsAuthor(ratingId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to update this rating");

        return await GraphQlMutationResolverService.UpdateEntity(
            unitOfWork,
            mapper,
            ratingId,
            patchDto
        );
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Rating?> UpdateRatingForRecipe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        ITopicEventSender sender,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId,
        RatingPatchDTO patchDto
    )
    {
        var rating = await unitOfWork
            .RatingsRepository.StartQuery()
            .Where(rating =>
                rating.UserId == authenticatedUser!.UserId && rating.RecipeId == recipeId
            )
            .FirstOrDefaultAsync();
        if (rating is null)
            throw new ReciperException("Rating not found");

        var updatedRating = mapper.Map(patchDto, rating);
        unitOfWork.RatingsRepository.Update(updatedRating);
        await unitOfWork.SaveChanges();

        return updatedRating;
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Rating?> DeleteRatingById(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid ratingId
    )
    {
        if (!await IsAuthor(ratingId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to delete this rating");

        return await GraphQlMutationResolverService.DeleteEntity(unitOfWork, ratingId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Rating?> DeleteRatingForRecipe(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId
    )
    {
        var rating = await unitOfWork
            .RatingsRepository.StartQuery()
            .Where(rating =>
                rating.UserId == authenticatedUser!.UserId && rating.RecipeId == recipeId
            )
            .FirstOrDefaultAsync();
        if (rating is null)
            throw new ReciperException("Rating not found");

        var success = await unitOfWork.RatingsRepository.Delete(rating.Id);
        if (!success)
            throw new ReciperException("Failed to delete rating");

        await unitOfWork.SaveChanges();

        return rating;
    }

    private static async Task<bool> IsAuthor(
        Guid ratingId,
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
            && await unitOfWork
                .RatingsRepository.StartQuery()
                .AsNoTracking()
                .AnyAsync(rating =>
                    rating.Id == ratingId && rating.UserId == authenticatedUser.UserId
                );
    }
}
