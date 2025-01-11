namespace Reciper.BLL.Search.Criteria.User;

public record UserSearchCriteria(
    string? Matching, // For overall text search (username, name, etc.)
    double? MinAverageRating, // Minimum average rating of user's recipes
    double? MaxAverageRating, // Maximum average rating of user's recipes
    int? MinRecipesCount, // Minimum number of recipes created
    int? MaxRecipesCount, // Maximum number of recipes created
    DateTime? RegisteredAfter, // User registered after date
    DateTime? RegisteredBefore, // User registered before date
    bool? HasPublishedRecipes, // Filter users who have published at least one recipe
    string[]? RecipeTagNames // Filter users who have recipes with specific tags
);