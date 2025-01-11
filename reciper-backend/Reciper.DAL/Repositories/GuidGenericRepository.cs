using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reciper.DAL.Models;

namespace Reciper.DAL.Repositories;

public class GuidGenericRepository<TEntity> : GenericRepository<TEntity, Guid>
    where TEntity : class
{
    public GuidGenericRepository(ReciperContext context, ILogger logger)
        : base(context, logger) { }

    public GuidGenericRepository(IDbContextFactory<ReciperContext> contextFactory, ILogger logger)
        : base(contextFactory, logger) { }
}
