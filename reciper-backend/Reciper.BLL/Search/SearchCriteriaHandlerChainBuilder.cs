using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Search;

public class SearchCriteriaHandlerChainBuilder<TContext, TCriteria, TEntity>
    : IChainable<ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity>>
    where TContext : DbContext
    where TCriteria : class
    where TEntity : class
{
    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity>? Next { get; set; }

    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> SetNextHandler(
        ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> next
    )
    {
        Next = next;
        return Next;
    }

    public ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> AddNextHandler(
        ISearchCriteriaQueryHandler<TContext, TCriteria, TEntity> next
    )
    {
        Next = next;
        return Next;
    }

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
