using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Search;

/// <summary>
/// Base implementation of a search criteria query handler that can be chained with other handlers.
/// </summary>
/// <typeparam name="TContext">The type of DbContext used for database operations.</typeparam>
/// <typeparam name="TSearchCriteria">The type of search criteria used for filtering.</typeparam>
/// <typeparam name="TQueryResult">The type of entity returned by the query.</typeparam>
public abstract class SearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    : ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    where TContext : DbContext
    where TQueryResult : class
{
    /// <inheritdoc />
    public virtual ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>? Next { get; set; }

    /// <inheritdoc />
    public virtual ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> SetNextHandler(
        ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> next
    )
    {
        Next = next;
        return this;
    }

    /// <inheritdoc />
    public virtual ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> AddNextHandler(
        ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> next
    )
    {
        Next = next;
        return Next;
    }

    /// <summary>
    /// Handles the search query by passing it to the next handler in the chain.
    /// If no next handler exists, returns the base query from the context.
    /// </summary>
    /// <param name="context">The database context instance.</param>
    /// <param name="searchCriteria">The search criteria to be applied.</param>
    /// <param name="query">Optional existing query to build upon.</param>
    /// <returns>An IQueryable representing the modified query after applying the search criteria.</returns>
    public virtual IQueryable<TQueryResult> HandleQuery(
        TContext context,
        TSearchCriteria? searchCriteria,
        IQueryable<TQueryResult>? query = null
    )
    {
        return Next?.HandleQuery(context, searchCriteria, query) ?? context.Set<TQueryResult>();
    }
}
