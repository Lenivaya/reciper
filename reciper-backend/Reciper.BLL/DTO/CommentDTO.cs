namespace Reciper.BLL.DTO;

public record CommentCreateDTO(Guid RecipeId, string Content);

public record CommentPatchDTO(string? Content);