using System.Security.Claims;

namespace Reciper.BLL.Contracts;

public interface ITokenService
{
    string GenerateToken(string id, string email);
    ClaimsPrincipal GetPrincipalFromToken(string token);
}