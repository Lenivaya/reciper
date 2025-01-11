using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Comment;

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationCommentsResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Comment,
        Guid,
        CommentCreateDTO,
        CommentPatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.CommentsRepository);

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<DAL.Models.Comment>> AddComment(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        CommentCreateDTO createDto
    )
    {
        var repo = unitOfWork.CommentsRepository;
        var entity = mapper.Map<DAL.Models.Comment>(createDto);
        entity.UserId = authenticatedUser!.UserId;
        var success = await repo.Insert(entity);
        if (!success)
            throw new ReciperException("Failed to insert entity");

        await unitOfWork.SaveChanges();
        return unitOfWork
            .CommentsRepository.StartQuery()
            .AsNoTracking()
            .Where(r => r.Id == entity.Id);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Comment?> DeleteCommentById(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid commentId
    )
    {
        if (!await IsAuthor(commentId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to delete this comment");

        return await GraphQlMutationResolverService.DeleteEntity(unitOfWork, commentId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public async Task<DAL.Models.Comment?> UpdateComment(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        ITopicEventSender sender,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        Guid commentId,
        CommentPatchDTO updateDto
    )
    {
        if (!await IsAuthor(commentId, authenticatedUser, unitOfWork))
            throw new ReciperException("Not authorized to update this comment");

        return await GraphQlMutationResolverService.UpdateEntity(
            unitOfWork,
            mapper,
            commentId,
            updateDto
        );
    }

    private static async Task<bool> IsAuthor(
        Guid commentId,
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
            && await unitOfWork
                .CommentsRepository.StartQuery()
                .AsNoTracking()
                .AnyAsync(comment =>
                    comment.Id == commentId && comment.UserId == authenticatedUser.UserId
                );
    }
}
