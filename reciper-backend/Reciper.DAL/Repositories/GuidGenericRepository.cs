using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reciper.DAL.Models;

namespace Reciper.DAL.Repositories;

/// <summary>
/// Generic repository class for entities with a Guid primary key.
/// </summary>
/// <typeparam name="TEntity">The entity type.</typeparam>
public class GuidGenericRepository<TEntity> : GenericRepository<TEntity, Guid>
    where TEntity : class
{
    /// <summary>
    /// Initializes a new instance of the <see cref="GuidGenericRepository{TEntity}"/> class.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="logger">The logger.</param>
    public GuidGenericRepository(ReciperContext context, ILogger logger)
        : base(context, logger) { }

    /// <summary>
    /// Initializes a new instance of the <see cref="GuidGenericRepository{TEntity}"/> class.
    /// </summary>
    /// <param name="contextFactory">The database context factory.</param>
    /// <param name="logger">The logger.</param>
    public GuidGenericRepository(IDbContextFactory<ReciperContext> contextFactory, ILogger logger)
        : base(contextFactory, logger) { }
}
