namespace Reciper.BLL.DTO;

public record CommentCreateDTO(Guid UserId, Guid RecipeId, string Content);

public record CommentPatchDTO(string? Content);
