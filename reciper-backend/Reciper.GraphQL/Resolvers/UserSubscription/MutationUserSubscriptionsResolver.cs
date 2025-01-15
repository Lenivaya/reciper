using HotChocolate.Authorization;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.UserSubscription;

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationUserSubscriptionsResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.UserSubscription,
        Guid,
        UserSubscriptionCreateDTO,
        UserSubscriptionPatchDTO
    > GraphQlMutationResolverService { get; } =
        new(unitOfWork => unitOfWork.SubscriptionsRepository);

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.UserSubscription>> Subscribe(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid subscribeeId
    )
    {
        if (authenticatedUser!.UserId == subscribeeId)
            throw new ReciperException("Cannot subscribe to yourself");

        try
        {
            var subscription = new DAL.Models.UserSubscription
            {
                SubscriberId = authenticatedUser.UserId,
                SubscribeeId = subscribeeId,
            };

            var success = await unitOfWork.SubscriptionsRepository.Insert(subscription);
            if (!success)
                throw new ReciperException("Failed to create subscription");

            await unitOfWork.SaveChanges();
            return unitOfWork
                .SubscriptionsRepository.StartQuery()
                .AsNoTracking()
                .Where(s => s.Id == subscription.Id);
        }
        catch (DbUpdateException e)
            when (e.InnerException is SqlException
                  && e.InnerException.Message.Contains("duplicate key")
                 )
        {
            throw new ReciperException("Subscription already exists");
        }
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.UserSubscription?> Unsubscribe(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid userId
    )
    {
        var subscription = await unitOfWork
            .SubscriptionsRepository.StartQuery()
            .Where(s => s.SubscriberId == authenticatedUser!.UserId && s.SubscribeeId == userId)
            .FirstOrDefaultAsync();

        if (subscription is null)
            throw new ReciperException("Subscription not found");

        var success = await unitOfWork.SubscriptionsRepository.Delete(subscription.Id);
        if (!success)
            throw new ReciperException("Failed to delete subscription");

        await unitOfWork.SaveChanges();
        return subscription;
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.UserSubscription?> DeleteSubscriptionById(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid subscriptionId
    )
    {
        if (!await IsSubscriptionOwner(subscriptionId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to delete this subscription");

        return await GraphQlMutationResolverService.DeleteEntity(unitOfWork, subscriptionId);
    }

    private static async Task<bool> IsSubscriptionOwner(
        Guid subscriptionId,
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
               && await unitOfWork
                   .SubscriptionsRepository.StartQuery()
                   .AsNoTracking()
                   .AnyAsync(sub =>
                       sub.Id == subscriptionId && sub.SubscriberId == authenticatedUser.UserId
                   );
    }
}