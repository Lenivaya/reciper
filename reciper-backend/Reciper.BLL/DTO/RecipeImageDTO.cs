namespace Reciper.BLL.DTO;

public record RecipeImageCreateDTO(Guid RecipeId, string Url, int Order);

public record RecipeImagePatchDTO(string? Url, int? Order);
