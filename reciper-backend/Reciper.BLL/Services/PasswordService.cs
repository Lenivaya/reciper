using Reciper.BLL.Contracts;

namespace Reciper.BLL.Services;

/// <summary>
/// Service for handling password hashing and verification.
/// </summary>
public class PasswordService : IPasswordService
{
    /// <summary>
    /// Hashes a plain text password using BCrypt.
    /// </summary>
    /// <param name="password">The plain text password to hash</param>
    /// <returns>The hashed password</returns>
    public string HashPassword(string password)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(8);
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return hashedPassword;
    }

    /// <summary>
    /// Verifies a plain text password against a hashed password.
    /// </summary>
    /// <param name="password">The plain text password to verify</param>
    /// <param name="hashedPassword">The hashed password to compare against</param>
    /// <returns>True if the password matches, false otherwise</returns>
    public bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}
