namespace Reciper.BLL.DTO;

public record RecipeIngredientCreateDTO(Guid RecipeId, Guid IngredientId, string Amount);

public record RecipeIngredientPatchDTO(string? Amount);
