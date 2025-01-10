using Reciper.DAL.Models.Enums;

namespace Reciper.BLL.DTO;

public record RecipeCreateDTO(
    Guid UserId,
    string Title,
    string Description,
    string Instructions,
    int CookingTimeMinutes,
    DifficultyLevel DifficultyLevel,
    List<Guid> Tags,
    List<Guid> Ingredients,
    List<Guid> Images
);

public record RecipePatchDTO(
    string? Title,
    string? Description,
    string? Instructions,
    int? CookingTimeMinutes,
    DifficultyLevel? DifficultyLevel,
    List<Guid>? Tags,
    List<Guid>? Ingredients,
    List<Guid>? Images
);
