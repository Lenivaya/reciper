using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using Reciper.DAL.Contracts;

namespace Reciper.DAL.UnitOfWork;

public class UnitOfWork<TContext>(TContext context, ILogger logger) : IUnitOfWork, IAsyncDisposable
    where TContext : DbContext, new()
{
    private bool _isDisposed;

    public UnitOfWork(IDbContextFactory<TContext> contextFactory, ILogger logger)
        : this(contextFactory.CreateDbContext(), logger) { }

    protected internal TContext Context { get; } = context;
    protected internal IDbContextTransaction? Transaction { get; set; }

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
                await Transaction.RollbackAsync();
                throw;
            }
    }

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
