using Reciper.DAL.Contracts;
using Reciper.DAL.Models;

namespace Reciper.DAL.Repositories;

using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class GenericRepository<TEntity, TPrimaryKey>
    : IEntityRepository<TEntity, TPrimaryKey>,
        IAsyncDisposable
    where TEntity : class
{
    public GenericRepository(ReciperContext context, ILogger logger)
    {
        Context = context;
        Logger = logger;
        DbSet = Context.Set<TEntity>();
    }

    public GenericRepository(IDbContextFactory<ReciperContext> contextFactory, ILogger logger)
    {
        Context = contextFactory.CreateDbContext();
        Logger = logger;
        DbSet = Context.Set<TEntity>();
    }

    internal ReciperContext Context { get; }
    internal DbSet<TEntity> DbSet { get; }
    internal ILogger Logger { get; }

    public virtual IEnumerable<string> DefaultIncludes { get; set; } = [];

    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
        GC.SuppressFinalize(this);
    }

    public virtual async Task<IEnumerable<TEntity>> Get(
        List<Expression<Func<TEntity, bool>>>? filters = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        IEnumerable<string>? includeProperties = null
    )
    {
        var query = StartQueryWithDefaultIncludes().AsNoTracking();

        if (filters != null)
            query = filters.Aggregate(query, (current, filter) => current.Where(filter));

        if (includeProperties != null)
            query = includeProperties.Aggregate(
                query,
                (current, includeProperty) => current.Include(includeProperty)
            );

        return orderBy != null ? await orderBy(query).ToListAsync() : await query.ToListAsync();
    }

    public virtual async Task<IEnumerable<TEntity>> GetAll()
    {
        var query = StartQueryWithDefaultIncludes();
        return await query.AsNoTracking().ToListAsync();
    }

    public virtual async Task<TEntity?> GetById(TPrimaryKey id)
    {
        try
        {
            return await DbSet.FindAsync(id);
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error getting entity with id {Id}", id);
            return null;
        }
    }

    public virtual async Task<bool> Insert(TEntity entity)
    {
        try
        {
            await DbSet.AddAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error adding entity");
            return false;
        }
    }

    public virtual async Task<bool> Delete(TPrimaryKey id)
    {
        try
        {
            var entityToDelete = await GetById(id);
            if (entityToDelete == null)
                return false;

            Delete(entityToDelete);
            return true;
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error deleting entity with id {Id}", id);
            return false;
        }
    }

    public virtual async Task<(bool, TEntity? entityToDelete)> DeleteWithEntityReturn(
        TPrimaryKey id
    )
    {
        try
        {
            var entityToDelete = await GetById(id);
            if (entityToDelete == null)
                return (false, entityToDelete);

            Delete(entityToDelete);
            return (true, entityToDelete);
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error deleting entity with id {Id}", id);
            return (false, null);
        }
    }

    public IQueryable<TEntity> StartQuery()
    {
        return DbSet;
    }

    public virtual void Delete(TEntity entityToDelete)
    {
        if (Context.Entry(entityToDelete).State == EntityState.Detached)
            DbSet.Attach(entityToDelete);
        DbSet.Remove(entityToDelete);
    }

    public virtual void Update(TEntity entityToUpdate)
    {
        DbSet.Attach(entityToUpdate);
        Context.Entry(entityToUpdate).State = EntityState.Modified;
    }

    public virtual IQueryable<TEntity> StartQueryWithDefaultIncludes()
    {
        var query = DbSet.AsQueryable();

        return DefaultIncludes.Aggregate(
            query,
            (current, includeProperty) => current.Include(includeProperty)
        );
    }

    public virtual async Task<(IEnumerable<TEntity> Items, int TotalCount)> GetPaginated(
        int pageNumber,
        int pageSize,
        List<Expression<Func<TEntity, bool>>>? filters = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        IEnumerable<string>? includeProperties = null
    )
    {
        var query = DbSet.AsNoTracking();

        if (filters != null)
            query = filters.Aggregate(query, (current, filter) => current.Where(filter));

        if (includeProperties != null)
            query = includeProperties.Aggregate(
                query,
                (current, includeProperty) => current.Include(includeProperty)
            );

        var totalCount = await query.CountAsync();

        if (orderBy != null)
            query = orderBy(query);

        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return (items, totalCount);
    }

    public virtual async Task<TEntity?> FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
    {
        return await StartQueryWithDefaultIncludes().AsNoTracking().FirstOrDefaultAsync(predicate);
    }

    public virtual async Task<bool> Any(Expression<Func<TEntity, bool>> predicate)
    {
        return await DbSet.AnyAsync(predicate);
    }

    public virtual async Task<int> Count(Expression<Func<TEntity, bool>>? predicate = null)
    {
        return predicate == null ? await DbSet.CountAsync() : await DbSet.CountAsync(predicate);
    }

    public virtual async Task<bool> InsertRange(IEnumerable<TEntity> entities)
    {
        try
        {
            await DbSet.AddRangeAsync(entities);
            return true;
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error adding range of entities");
            return false;
        }
    }

    public virtual async Task<bool> DeleteRange(IEnumerable<TEntity> entities)
    {
        try
        {
            DbSet.RemoveRange(entities);
            return true;
        }
        catch (Exception e)
        {
            Logger.LogError(e, "Error deleting range of entities");
            return false;
        }
    }

    public virtual void UpdateRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
        {
            DbSet.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
        }
    }
}
