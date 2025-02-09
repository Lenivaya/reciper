using Reciper.DAL.Models.Enums;

namespace Reciper.BLL.Search.Criteria.Recipe;

public record RecipeSearchCriteria(
    string? Matching, // For overall text search
    string[]? Tags, // Search by tags
    string[]? IngredientNames, // Search by ingredient names
    int? MinCookingTime, // Minimum cooking time in minutes
    int? MaxCookingTime, // Maximum cooking time in minutes
    double? MinRating, // Minimum average rating
    double? MaxRating, // Maximum average rating
    DifficultyLevel[]? DifficultyLevels, // Difficulty level
    DateTime? CreatedAfter, // Recipe created after date
    DateTime? CreatedBefore, // Recipe created before date
    Guid? AuthorId // Author id
);
