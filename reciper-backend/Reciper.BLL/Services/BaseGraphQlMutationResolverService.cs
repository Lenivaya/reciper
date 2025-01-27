using HotChocolate;
using MapsterMapper;
using Reciper.BLL.Exceptions;
using Reciper.DAL.Contracts;

namespace Reciper.BLL.Services;

/// <summary>
/// Delegate for retrieving an entity repository from a unit of work.
/// </summary>
/// <typeparam name="TEntity">The entity type</typeparam>
/// <typeparam name="TPrimaryKey">The primary key type of the entity</typeparam>
/// <param name="unitOfWork">The unit of work instance</param>
/// <returns>An entity repository instance</returns>
public delegate IEntityRepository<TEntity, TPrimaryKey> GetRepositoryFunc<TEntity, in TPrimaryKey>(
    IReciperUnitOfWork unitOfWork
)
    where TEntity : class;

/// <summary>
/// Base service for handling GraphQL mutations with common CRUD operations.
/// </summary>
/// <typeparam name="TEntity">The entity type</typeparam>
/// <typeparam name="TPrimaryKey">The primary key type of the entity</typeparam>
/// <typeparam name="TCreateDto">The DTO type for creation operations</typeparam>
/// <typeparam name="TUpdateDto">The DTO type for update operations</typeparam>
public class BaseGraphQlMutationResolverService<TEntity, TPrimaryKey, TCreateDto, TUpdateDto>(
    GetRepositoryFunc<TEntity, TPrimaryKey> getRepository
)
    where TEntity : class
{
    /// <summary>
    /// Adds a new entity to the database.
    /// </summary>
    /// <param name="unitOfWork">The unit of work instance</param>
    /// <param name="mapper">The mapper instance</param>
    /// <param name="createDto">The DTO containing creation data</param>
    /// <param name="onSuccess">Optional callback executed after successful creation</param>
    /// <returns>The created entity</returns>
    public async Task<TEntity?> AddEntity(
        [Service] IReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        TCreateDto createDto,
        Action<TEntity>? onSuccess = null
    )
    {
        try
        {
            var repo = getRepository(unitOfWork);
            var entity = mapper.Map<TEntity>(createDto!);
            var success = await repo.Insert(entity);
            if (!success)
                throw new ReciperException("Failed to insert entity");

            await unitOfWork.SaveChanges();
            onSuccess?.Invoke(entity);
            return entity;
        }
        catch (Exception e)
        {
            throw new ReciperException(e.Message);
        }
    }

    /// <summary>
    /// Deletes an entity from the database.
    /// </summary>
    /// <param name="unitOfWork">The unit of work instance</param>
    /// <param name="id">The ID of the entity to delete</param>
    /// <param name="onSuccess">Optional callback executed after successful deletion</param>
    /// <returns>The deleted entity</returns>
    public async Task<TEntity?> DeleteEntity(
        [Service] IReciperUnitOfWork unitOfWork,
        TPrimaryKey id,
        Action<TEntity>? onSuccess = null
    )
    {
        try
        {
            var repo = getRepository(unitOfWork);
            var (isDeleted, deletedEntity) = await repo.DeleteWithEntityReturn(id);
            if (!isDeleted || deletedEntity is null)
                throw new ReciperException("Failed to delete entity");

            await unitOfWork.SaveChanges();
            onSuccess?.Invoke(deletedEntity);
            return deletedEntity;
        }
        catch (Exception e)
        {
            throw new ReciperException(e.Message);
        }
    }

    /// <summary>
    /// Updates an existing entity in the database.
    /// </summary>
    /// <param name="unitOfWork">The unit of work instance</param>
    /// <param name="mapper">The mapper instance</param>
    /// <param name="id">The ID of the entity to update</param>
    /// <param name="updateDto">The DTO containing update data</param>
    /// <param name="onSuccess">Optional callback executed after successful update</param>
    /// <returns>The updated entity</returns>
    public async Task<TEntity?> UpdateEntity(
        [Service] IReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        TPrimaryKey id,
        TUpdateDto updateDto,
        Action<TEntity>? onSuccess = null
    )
    {
        try
        {
            var repo = getRepository(unitOfWork);
            var entityToUpdate = await repo.GetById(id);

            if (entityToUpdate == null)
                throw new ReciperException("Entity not found");

            var updatedEntity = mapper.Map(updateDto, entityToUpdate);

            repo.Update(updatedEntity);
            await unitOfWork.SaveChanges();
            onSuccess?.Invoke(updatedEntity);

            return updatedEntity;
        }
        catch (Exception e)
        {
            throw new ReciperException(e.InnerException?.Message ?? e.Message);
        }
    }
}
