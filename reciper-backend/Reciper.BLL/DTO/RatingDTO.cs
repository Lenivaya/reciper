namespace Reciper.BLL.DTO;

public record RatingCreateDTO(Guid RecipeId, int Value);

public record RatingPatchDTO(int? Value);
