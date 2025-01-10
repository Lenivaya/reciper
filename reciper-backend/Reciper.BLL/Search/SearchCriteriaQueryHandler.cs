using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Search;

public abstract class SearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    : ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    where TContext : DbContext
    where TQueryResult : class
{
    public virtual ISearchCriteriaQueryHandler<
        TContext,
        TSearchCriteria,
        TQueryResult
    >? Next { get; set; }

    public virtual ISearchCriteriaQueryHandler<
        TContext,
        TSearchCriteria,
        TQueryResult
    > SetNextHandler(ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> next)
    {
        Next = next;
        return this;
    }

    public virtual ISearchCriteriaQueryHandler<
        TContext,
        TSearchCriteria,
        TQueryResult
    > AddNextHandler(ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult> next)
    {
        Next = next;
        return Next;
    }

    public virtual IQueryable<TQueryResult> HandleQuery(
        TContext context,
        TSearchCriteria? searchCriteria,
        IQueryable<TQueryResult>? query = null
    )
    {
        return Next?.HandleQuery(context, searchCriteria, query) ?? context.Set<TQueryResult>();
    }
}
