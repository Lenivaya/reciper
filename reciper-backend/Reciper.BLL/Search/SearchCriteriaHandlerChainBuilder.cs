using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Search;

/// <summary>
/// Builds and manages a chain of search criteria handlers.
/// </summary>
/// <typeparam name="TContext">The type of DbContext used for database operations.</typeparam>
/// <typeparam name="TCriteria">The type of search criteria used for filtering.</typeparam>
/// <typeparam name="TEntity">The type of entity being queried.</typeparam>
public class SearchCriteriaHandlerChainBuilder<TContext, TCriteria, TEntity>
    : IChainable<ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity>>
    where TContext : DbContext
    where TCriteria : class
    where TEntity : class
{
    /// <inheritdoc />
    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity>? Next { get; set; }

    /// <inheritdoc />
    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> SetNextHandler(
        ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> next
    )
    {
        Next = next;
        return Next;
    }

    /// <inheritdoc />
    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> AddNextHandler(
        ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> next
    )
    {
        Next = next;
        return Next;
    }

    /// <summary>
    /// Builds a chain of handlers from an array of handler instances.
    /// </summary>
    /// <param name="handlers">Array of handlers to be chained together.</param>
    /// <returns>The first handler in the chain.</returns>
    /// <exception cref="InvalidOperationException">Thrown when no handlers are provided.</exception>
    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> BuildChain(
        ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity>[] handlers
    )
    {
        if (handlers.Length == 0)
            return Next ?? throw new InvalidOperationException("No handlers provided");

        Next = handlers[0];

        for (var i = 0; i < handlers.Length - 1; i++)
            handlers[i].SetNextHandler(handlers[i + 1]);

        return handlers.First();
    }
}
