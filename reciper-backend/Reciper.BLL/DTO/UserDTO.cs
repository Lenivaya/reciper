namespace Reciper.BLL.DTO;

public record UserCreateDTO(
    string Username,
    string Email,
    string Password,
    string? ProfilePictureUrl,
    string? Bio
);

public record UserPatchDTO(
    string? Username,
    string? ProfilePictureUrl,
    string? Bio,
    bool? IsActive
);

public record LoginDTO(string Email, string Password);
