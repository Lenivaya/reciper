using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.Models;
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

        await unitOfWork.BeginTransaction();
        await unitOfWork
            .RecipeLikesRepository.StartQuery()
            .Where(rl => rl.RecipeId == recipeId)
            .ExecuteDeleteAsync();

        var result = await GraphQlMutationResolverService.DeleteEntity(unitOfWork, recipeId);
        await unitOfWork.Commit();
        return result;
    }

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.Recipe>> UpdateRecipe(
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

        try
        {
            await unitOfWork.BeginTransaction();

            var entityToUpdate = await unitOfWork.RecipesRepository.GetById(recipeId);

            if (entityToUpdate == null)
                throw new ReciperException("Recipe not found");

            await unitOfWork
                .RecipeIngredientsRepository.StartQuery()
                .Where(ri => ri.RecipeId == recipeId)
                .ExecuteDeleteAsync();
            await unitOfWork
                .RecipeTagsRepository.StartQuery()
                .Where(rt => rt.RecipeId == recipeId)
                .ExecuteDeleteAsync();

            var updatedEntity = mapper.Map(updateDto, entityToUpdate);

            unitOfWork.RecipesRepository.Update(updatedEntity);
            await unitOfWork.Commit();

            await sender.SendAsync(
                $"{nameof(SubscriptionRecipesResolver.RecipeUpdated)}-{recipeId}",
                updatedEntity.Id
            );

            return unitOfWork
                .RecipesRepository.StartQuery()
                .AsNoTracking()
                .Where(r => r.Id == recipeId);
        }
        catch (Exception e)
        {
            throw new ReciperException(e.InnerException?.Message ?? e.Message);
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

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.Recipe>> AddRecipePhoto(
        ReciperUnitOfWork unitOfWork,
        [Service] ICloudinary cloudinary,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId,
        int order,
        IFile file
    )
    {
        try
        {
            var recipe = await unitOfWork
                .RecipesRepository.StartQuery()
                .Where(r => r.UserId == authenticatedUser!.UserId && r.Id == recipeId)
                .Include(r => r.Images)
                .FirstOrDefaultAsync();

            if (recipe == null)
                throw new ReciperException("Recipe not found");

            await using Stream stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.Name, stream),
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            await unitOfWork.BeginTransaction();
            var newPhoto = new RecipeImage
            {
                Order = order,
                PublicId = uploadResult.PublicId,
                Url = uploadResult.Url.ToString(),
                CreatedAt = uploadResult.CreatedAt,
                Recipe = recipe,
            };
            var success = await unitOfWork.RecipeImagesRepository.Insert(newPhoto);
            if (!success)
                throw new ReciperException("Error while inserting photo to db");

            recipe.Images.Add(newPhoto);
            await unitOfWork.Commit();

            return unitOfWork
                .RecipesRepository.StartQuery()
                .AsNoTracking()
                .Where(r => r.Id == recipe.Id);
        }
        catch (Exception e)
        {
            throw new ReciperException(e.Message);
        }
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.RecipeImage> DeleteRecipePhoto(
        ReciperUnitOfWork unitOfWork,
        [Service] ICloudinary cloudinary,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid recipeId,
        Guid photoId
    )
    {
        try
        {
            var recipe = await unitOfWork
                .RecipesRepository.StartQuery()
                .Where(r => r.UserId == authenticatedUser!.UserId && r.Id == recipeId)
                .Include(r => r.Images)
                .FirstOrDefaultAsync();
            if (recipe == null)
                throw new ReciperException("Recipe not found");

            var photo = recipe.Images.FirstOrDefault(pi => pi.Id == photoId);
            if (photo == null)
                throw new ReciperException("Photo not found");

            await unitOfWork.BeginTransaction();

            var deleteParams = new DeletionParams(photo.PublicId);
            var deleteResult = await cloudinary.DestroyAsync(deleteParams);
            if (!deleteResult.Result.Equals("ok"))
                throw new ReciperException("Error while deleting photo from cloudinary");

            unitOfWork.RecipeImagesRepository.Delete(photo);

            await unitOfWork.Commit();

            return photo;
        }
        catch (Exception e)
        {
            throw new ReciperException(e.Message);
        }
    }
}
