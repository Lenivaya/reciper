using HotChocolate.Authorization;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;
using Reciper.BLL.DTO;
using Reciper.BLL.Services;
using Reciper.DAL.Models;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Users;

public record UserLoginPayload(string? Token, User? User);

[ExtendObjectType(typeof(Mutation))]
[Authorize]
public class MutationUsersResolver
{
    private BaseGraphQlMutationResolverService<
        User,
        Guid,
        UserCreateDTO,
        UserPatchDTO
    > GraphQlMutationResolverService { get; } = new(unitOfWork => unitOfWork.UsersRepository);

    private static async Task<bool> IsSameUser(
        AppActor<Guid>? authenticatedUser,
        ReciperUnitOfWork unitOfWork
    )
    {
        return authenticatedUser != null
               && await unitOfWork
                   .UsersRepository.StartQuery()
                   .AsNoTracking()
                   .AnyAsync(
                       user =>
                           user.Id == authenticatedUser.UserId
                   );
    }

    [AllowAnonymous]
    public async Task<User?> RegisterUser(
        [Service] IMapper mapper,
        [Service] IPasswordService passwordService,
        ReciperUnitOfWork unitOfWork,
        UserCreateDTO userCreateDto
    )
    {
        var account = mapper.Map<User>(userCreateDto);
        account.PasswordHash = passwordService.HashPassword(userCreateDto.Password);

        if (!await unitOfWork.UsersRepository.Insert(account))
            return null;

        await unitOfWork.SaveChanges();

        return account;
    }

    [AllowAnonymous]
    public async Task<UserLoginPayload> LoginUser(
        [Service] IMapper mapper,
        [Service] IPasswordService passwordService,
        [Service] ITokenService tokenService,
        ReciperUnitOfWork unitOfWork,
        LoginDTO loginDto
    )
    {
        var account = await unitOfWork
            .UsersRepository.StartQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(seeker => seeker.Email == loginDto.Email);

        if (account == null)
            return new UserLoginPayload(null, null);

        var isAuthorized = passwordService.VerifyPassword(loginDto.Password, account.PasswordHash);

        if (!isAuthorized)
            return new UserLoginPayload(null, null);

        var token = tokenService.GenerateToken(
            account.Id.ToString(),
            account.Email
        );

        return new UserLoginPayload(token, account);
    }

    public async Task<User?> DeleteUser(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return
            await IsSameUser(authenticatedUser, unitOfWork)
                ? await GraphQlMutationResolverService.DeleteEntity(unitOfWork, authenticatedUser!.UserId)
                : null;
    }

    public async Task<User?> UpdateUserById(
        [Service] IMapper mapper,
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        UserPatchDTO userPatchDto
    )
    {
        return
            await IsSameUser(authenticatedUser, unitOfWork)
                ? await GraphQlMutationResolverService.UpdateEntity(
                    unitOfWork,
                    mapper,
                    authenticatedUser!.UserId,
                    userPatchDto
                )
                : null;
    }
}