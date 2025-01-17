using MapsterMapper;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Tag;

[ExtendObjectType(typeof(Mutation))]
public class MutationTagsResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Tag,
        Guid,
        TagCreateDTO,
        TagPatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.TagsRepository);

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Tag?> AddTag(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        TagCreateDTO createDto
    )
    {
        return GraphQlMutationResolverService.AddEntity(unitOfWork, mapper, createDto);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Tag?> DeleteTagById(ReciperUnitOfWork unitOfWork, Guid tagId)
    {
        return GraphQlMutationResolverService.DeleteEntity(unitOfWork, tagId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Tag?> UpdateTag(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        Guid tagId,
        TagPatchDTO updateDto
    )
    {
        return GraphQlMutationResolverService.UpdateEntity(unitOfWork, mapper, tagId, updateDto);
    }
}