namespace Reciper.DAL.Contracts;

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChanges();
    Task BeginTransaction();
    Task Commit();
    Task Rollback();
}
