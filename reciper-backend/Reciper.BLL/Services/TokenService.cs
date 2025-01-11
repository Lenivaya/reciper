using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Reciper.BLL.Contracts;

namespace Reciper.BLL.Services;

public class TokenService(string key, string issuer, string audience) : ITokenService
{
    private string Key { get; } = key;

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
