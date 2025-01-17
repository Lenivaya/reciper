using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using Reciper.DAL.Contracts;

namespace Reciper.DAL.UnitOfWork;

/// <summary>
/// Generic implementation of the Unit of Work pattern for managing database transactions and operations.
/// </summary>
/// <typeparam name="TContext">The type of DbContext to be used.</typeparam>
/// <param name="context">The database context instance.</param>
/// <param name="logger">The logger instance for error logging.</param>
public class UnitOfWork<TContext>(TContext context, ILogger logger) : IUnitOfWork, IAsyncDisposable
    where TContext : DbContext, new()
{
    private bool _isDisposed;

    /// <summary>
    /// Initializes a new instance of the UnitOfWork class using a DbContext factory.
    /// </summary>
    /// <param name="contextFactory">The factory for creating DbContext instances.</param>
    /// <param name="logger">The logger instance for error logging.</param>
    public UnitOfWork(IDbContextFactory<TContext> contextFactory, ILogger logger)
        : this(contextFactory.CreateDbContext(), logger)
    {
    }

    /// <summary>
    /// Gets the current database context instance.
    /// </summary>
    protected internal TContext Context { get; } = context;

    /// <summary>
    /// Gets or sets the current database transaction.
    /// </summary>
    protected internal IDbContextTransaction? Transaction { get; set; }

    /// <summary>
    /// Gets the logger instance.
    /// </summary>
    protected internal ILogger Logger { get; } = logger;

    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
        Dispose();
    }

    public Task<int> SaveChanges()
    {
        return Context.SaveChangesAsync();
    }

    public async Task BeginTransaction()
    {
        Transaction = await Context.Database.BeginTransactionAsync();
    }


    /// <inheritdoc />
    public async Task Commit()
    {
        if (Transaction != null)
            try
            {
                await Context.SaveChangesAsync();
                await Transaction.CommitAsync();
            }
            catch
            {
                logger.LogError("Failed to commit transaction");
                await Transaction.RollbackAsync();
                throw;
            }
    }

    /// <inheritdoc />
    public Task Rollback()
    {
        return Transaction != null ? Transaction.RollbackAsync() : Task.CompletedTask;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_isDisposed && disposing)
        {
            Transaction?.Dispose();
            Context.Dispose();
        }

        _isDisposed = true;
    }
}