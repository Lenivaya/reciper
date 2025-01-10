using MapsterMapper;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Ingredient;

[ExtendObjectType(typeof(Mutation))]
public class MutationIngredientsResolver
{
    private BaseGraphQlMutationResolverService<
        DAL.Models.Ingredient,
        Guid,
        IngredientCreateDTO,
        IngredientPatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.IngredientsRepository);

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Ingredient?> AddIngredient(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        IngredientCreateDTO createDto
    )
    {
        return GraphQlMutationResolverService.AddEntity(unitOfWork, mapper, createDto);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Ingredient?> DeleteIngredientById(
        ReciperUnitOfWork unitOfWork,
        Guid ingredientId
    )
    {
        return GraphQlMutationResolverService.DeleteEntity(unitOfWork, ingredientId);
    }

    [Error(typeof(ReciperException))]
    [UseProjection]
    public Task<DAL.Models.Ingredient?> UpdateIngredient(
        ReciperUnitOfWork unitOfWork,
        [Service] IMapper mapper,
        Guid ingredientId,
        IngredientPatchDTO updateDto
    )
    {
        return GraphQlMutationResolverService.UpdateEntity(
            unitOfWork,
            mapper,
            ingredientId,
            updateDto
        );
    }
}
