using HotChocolate;
using MapsterMapper;
using Reciper.BLL.Exceptions;
using Reciper.DAL.Contracts;

namespace Reciper.BLL.Services;

public delegate IEntityRepository<TEntity, TPrimaryKey> GetRepositoryFunc<TEntity, in TPrimaryKey>(
    IReciperUnitOfWork unitOfWork
)
    where TEntity : class;

public class BaseGraphQlMutationResolverService<TEntity, TPrimaryKey, TCreateDto, TUpdateDto>(
    GetRepositoryFunc<TEntity, TPrimaryKey> getRepository
)
    where TEntity : class
{
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
            throw new ReciperException(e.Message);
        }
    }
}
