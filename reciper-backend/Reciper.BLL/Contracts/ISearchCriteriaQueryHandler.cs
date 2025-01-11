using Microsoft.EntityFrameworkCore;

namespace Reciper.BLL.Contracts;

/// <summary>
/// Defines a handler for processing search criteria queries in a chain of responsibility pattern.
/// </summary>
/// <typeparam name="TContext">The type of DbContext used for database operations.</typeparam>
/// <typeparam name="TSearchCriteria">The type of search criteria used for filtering.</typeparam>
/// <typeparam name="TQueryResult">The type of entity returned by the query.</typeparam>
public interface ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    : IChainable<ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>>
    where TContext : DbContext
    where TQueryResult : class
{
    /// <summary>
    /// Handles the search query by applying specific criteria and passing it through the chain.
    /// </summary>
    /// <param name="context">The database context instance.</param>
    /// <param name="searchCriteria">The search criteria to be applied.</param>
    /// <param name="query">Optional existing query to build upon.</param>
    /// <returns>An IQueryable representing the modified query after applying the search criteria.</returns>
    IQueryable<TQueryResult> HandleQuery(
        TContext context,
        TSearchCriteria? searchCriteria,
        IQueryable<TQueryResult>? query = null
    );
}
