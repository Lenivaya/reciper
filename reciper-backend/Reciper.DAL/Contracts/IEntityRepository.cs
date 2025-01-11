using System.Linq.Expressions;

namespace Reciper.DAL.Contracts;

/// <summary>
/// Defines the contract for a generic repository providing basic CRUD operations for entities.
/// </summary>
/// <typeparam name="TEntity">The entity type.</typeparam>
/// <typeparam name="TPrimaryKey">The primary key type.</typeparam>
public interface IEntityRepository<TEntity, in TPrimaryKey>
    where TEntity : class
{
    /// <summary>
    /// Retrieves a paginated list of entities.
    /// </summary>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="pageSize">The page size.</param>
    /// <param name="filters">Optional filters to apply.</param>
    /// <param name="orderBy">Optional ordering to apply.</param>
    /// <param name="includeProperties">Optional navigation properties to include.</param>
    /// <returns>A tuple containing the list of items and the total count.</returns>
    Task<(IEnumerable<TEntity> Items, int TotalCount)> GetPaginated(
        int pageNumber,
        int pageSize,
        List<Expression<Func<TEntity, bool>>>? filters = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        IEnumerable<string>? includeProperties = null
    );

    /// <summary>
    /// Starts a query for the entity.
    /// </summary>
    /// <returns>An IQueryable for the entity.</returns>
    IQueryable<TEntity> StartQuery();

    /// <summary>
    /// Starts a query for the entity with default includes.
    /// </summary>
    /// <returns>An IQueryable for the entity with default includes.</returns>
    IQueryable<TEntity> StartQueryWithDefaultIncludes();

    /// <summary>
    /// Retrieves all entities.
    /// </summary>
    /// <returns>A collection of all entities.</returns>
    Task<IEnumerable<TEntity>> GetAll();

    /// <summary>
    /// Retrieves an entity by its primary key.
    /// </summary>
    /// <param name="id">The primary key.</param>
    /// <returns>The entity, or null if not found.</returns>
    Task<TEntity?> GetById(TPrimaryKey id);

    /// <summary>
    /// Inserts a new entity.
    /// </summary>
    /// <param name="entity">The entity to insert.</param>
    /// <returns>True if the insert was successful, otherwise false.</returns>
    Task<bool> Insert(TEntity entity);

    /// <summary>
    /// Deletes an entity by its primary key.
    /// </summary>
    /// <param name="id">The primary key.</param>
    /// <returns>True if the delete was successful, otherwise false.</returns>
    Task<bool> Delete(TPrimaryKey id);

    /// <summary>
    /// Deletes an entity by its primary key and returns the deleted entity.
    /// </summary>
    /// <param name="id">The primary key.</param>
    /// <returns>A tuple containing a boolean indicating success and the deleted entity, or null if not found.</returns>
    Task<(bool, TEntity? entityToDelete)> DeleteWithEntityReturn(TPrimaryKey id);

    /// <summary>
    /// Deletes the specified entity from the repository.
    /// </summary>
    /// <param name="entityToDelete">The entity to delete.</param>
    void Delete(TEntity entityToDelete);

    /// <summary>
    /// Updates the specified entity in the repository.
    /// </summary>
    /// <param name="entityToUpdate">The entity to update.</param>
    void Update(TEntity entityToUpdate);

    /// <summary>
    /// Returns the first entity matching the specified predicate, or null if none found.
    /// </summary>
    /// <param name="predicate">The predicate to filter entities.</param>
    /// <returns>The first matching entity or null.</returns>
    Task<TEntity?> FirstOrDefault(Expression<Func<TEntity, bool>> predicate);

    /// <summary>
    /// Determines whether any entity matches the specified predicate.
    /// </summary>
    /// <param name="predicate">The predicate to test entities against.</param>
    /// <returns>True if any entity matches the predicate, otherwise false.</returns>
    Task<bool> Any(Expression<Func<TEntity, bool>> predicate);

    /// <summary>
    /// Counts the number of entities matching the optional predicate.
    /// </summary>
    /// <param name="predicate">Optional predicate to filter entities.</param>
    /// <returns>The count of matching entities.</returns>
    Task<int> Count(Expression<Func<TEntity, bool>>? predicate = null);

    /// <summary>
    /// Inserts multiple entities into the repository.
    /// </summary>
    /// <param name="entities">The collection of entities to insert.</param>
    /// <returns>True if the insertion was successful, otherwise false.</returns>
    Task<bool> InsertRange(IEnumerable<TEntity> entities);

    /// <summary>
    /// Deletes multiple entities from the repository.
    /// </summary>
    /// <param name="entities">The collection of entities to delete.</param>
    /// <returns>True if the deletion was successful, otherwise false.</returns>
    Task<bool> DeleteRange(IEnumerable<TEntity> entities);

    /// <summary>
    /// Updates multiple entities in the repository.
    /// </summary>
    /// <param name="entities">The collection of entities to update.</param>
    void UpdateRange(IEnumerable<TEntity> entities);
}
