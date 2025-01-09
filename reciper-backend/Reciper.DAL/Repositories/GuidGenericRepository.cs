namespace Reciper.DAL.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

public class GuidGenericRepository<TEntity> : GenericRepository<TEntity, Guid>
    where TEntity : class
{
    public GuidGenericRepository(ReciperContext context, ILogger logger)
        : base(context, logger)
    {
    }

    public GuidGenericRepository(IDbContextFactory<ReciperContext> contextFactory, ILogger logger)
        : base(contextFactory, logger)
    {
    }
}