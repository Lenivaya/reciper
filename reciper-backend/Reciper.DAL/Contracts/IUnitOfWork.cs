namespace Reciper.DAL.Contracts;

/// <summary>
/// Represents a unit of work pattern implementation for managing database transactions and operations.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    /// <summary>
    /// Saves all pending changes in the current transaction to the database.
    /// </summary>
    /// <returns>The number of affected rows in the database.</returns>
    Task<int> SaveChanges();

    /// <summary>
    /// Begins a new database transaction.
    /// </summary>
    Task BeginTransaction();

    /// <summary>
    /// Commits the current transaction and saves all pending changes to the database.
    /// </summary>
    /// <exception cref="Exception">Thrown when the transaction commit fails.</exception>
    Task Commit();

    /// <summary>
    /// Rolls back the current transaction, reverting any pending changes.
    /// </summary>
    Task Rollback();
}
