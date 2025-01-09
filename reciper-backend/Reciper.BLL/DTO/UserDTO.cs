namespace Reciper.BLL.DTO;

public record UserCreateDTO(
    string Username,
    string Email,
    string PasswordHash,
    string? ProfilePictureUrl,
    string? Bio
);

public record UserPatchDTO(
    string? Username,
    string? Email,
    string? PasswordHash,
    string? ProfilePictureUrl,
    string? Bio,
    bool? IsActive
);
