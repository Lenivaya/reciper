using System.Linq.Expressions;

namespace Reciper.DAL.Contracts;

public interface IEntityRepository<TEntity, in TPrimaryKey>
    where TEntity : class
{
    Task<(IEnumerable<TEntity> Items, int TotalCount)> GetPaginated(
        int pageNumber,
        int pageSize,
        List<Expression<Func<TEntity, bool>>>? filters = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        IEnumerable<string>? includeProperties = null
    );

    IQueryable<TEntity> StartQuery();
    IQueryable<TEntity> StartQueryWithDefaultIncludes();

    Task<IEnumerable<TEntity>> GetAll();
    Task<TEntity?> GetById(TPrimaryKey id);
    Task<bool> Insert(TEntity entity);
    Task<bool> Delete(TPrimaryKey id);
    Task<(bool, TEntity? entityToDelete)> DeleteWithEntityReturn(TPrimaryKey id);

    void Delete(TEntity entityToDelete);
    void Update(TEntity entityToUpdate);

    Task<TEntity?> FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
    Task<bool> Any(Expression<Func<TEntity, bool>> predicate);
    Task<int> Count(Expression<Func<TEntity, bool>>? predicate = null);

    Task<bool> InsertRange(IEnumerable<TEntity> entities);
    Task<bool> DeleteRange(IEnumerable<TEntity> entities);
    void UpdateRange(IEnumerable<TEntity> entities);
}
