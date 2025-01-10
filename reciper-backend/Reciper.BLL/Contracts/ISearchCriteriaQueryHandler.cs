using Microsoft.EntityFrameworkCore;

namespace Reciper.BLL.Contracts;

public interface ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>
    : IChainable<ISearchCriteriaQueryHandler<TContext, TSearchCriteria, TQueryResult>>
    where TContext : DbContext
    where TQueryResult : class
{
    IQueryable<TQueryResult> HandleQuery(
        TContext context,
        TSearchCriteria? searchCriteria,
        IQueryable<TQueryResult>? query = null
    );
}