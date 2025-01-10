using Reciper.BLL.Contracts;

namespace Reciper.BLL.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(8);
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return hashedPassword;
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}