namespace Reciper.BLL.DTO;

public record RatingCreateDTO(Guid UserId, Guid RecipeId, int Value);

public record RatingPatchDTO(int? Value);
