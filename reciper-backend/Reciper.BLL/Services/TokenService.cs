using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Services;

/// <summary>
/// Service for JWT token generation and validation.
/// </summary>
public class TokenService(string key, string issuer, string audience) : ITokenService
{
    /// <summary>
    /// The secret key used for token signing
    /// </summary>
    private string Key { get; } = key;

    /// <summary>
    /// Generates a JWT token for a user.
    /// </summary>
    /// <param name="id">The user's ID</param>
    /// <param name="email">The user's email</param>
    /// <returns>A JWT token string</returns>
    public string GenerateToken(string id, string email)
    {
        List<Claim> claims =
        [
            new(JwtRegisteredClaimNames.Sub, id),
            new(ClaimTypes.PrimarySid, id),
            new(ClaimTypes.Email, email),
        ];

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.UtcNow.AddMonths(4),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <summary>
    /// Validates a JWT token and extracts the claims principal.
    /// </summary>
    /// <param name="token">The JWT token to validate</param>
    /// <returns>The claims principal contained in the token</returns>
    public ClaimsPrincipal GetPrincipalFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        return tokenHandler.ValidateToken(
            token,
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key)),
            },
            out _
        );
    }
}