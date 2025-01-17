using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HotChocolate.Authorization;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Reciper.BLL.Contracts;
using Reciper.BLL.DTO;
using Reciper.BLL.Exceptions;
using Reciper.BLL.Services;
using Reciper.DAL.Models;
using Reciper.DAL.UnitOfWork;
using Reciper.GraphQL.Interceptors;
using Reciper.GraphQL.Schema;

namespace Reciper.GraphQL.Resolvers.Users;

public record UserLoginPayload(string? Token, User? User);

public record UserRegisterPayload(string? Token, User? User);

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
                   .AnyAsync(user => user.Id == authenticatedUser.UserId);
    }

    [Error(typeof(ReciperException))]
    [AllowAnonymous]
    public async Task<UserRegisterPayload> RegisterUser(
        [Service] IMapper mapper,
        [Service] IPasswordService passwordService,
        [Service] ITokenService tokenService,
        ReciperUnitOfWork unitOfWork,
        UserCreateDTO userCreateDto
    )
    {
        var account = mapper.Map<User>(userCreateDto);
        account.PasswordHash = passwordService.HashPassword(userCreateDto.Password);

        if (!await unitOfWork.UsersRepository.Insert(account))
            throw new ReciperException("Error while creating user");

        await unitOfWork.SaveChanges();

        var token = tokenService.GenerateToken(account.Id.ToString(), account.Email);

        return new UserRegisterPayload(token, account);
    }

    [Error(typeof(ReciperException))]
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
            .FirstOrDefaultAsync(seeker => seeker.Email == loginDto.Login || seeker.Username == loginDto.Login);

        if (account == null)
            throw new ReciperException("Invalid credentials");

        var isAuthorized = passwordService.VerifyPassword(loginDto.Password, account.PasswordHash);

        if (!isAuthorized)
            throw new ReciperException("Invalid credentials");

        var token = tokenService.GenerateToken(account.Id.ToString(), account.Email);

        return new UserLoginPayload(token, account);
    }

    public async Task<User?> DeleteUser(
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser
    )
    {
        return await IsSameUser(authenticatedUser, unitOfWork)
            ? await GraphQlMutationResolverService.DeleteEntity(
                unitOfWork,
                authenticatedUser!.UserId
            )
            : null;
    }

    [Error(typeof(ReciperException))]
    public async Task<User?> UpdateUser(
        [Service] IMapper mapper,
        ReciperUnitOfWork unitOfWork,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser,
        UserPatchDTO userPatchDto
    )
    {
        return await IsSameUser(authenticatedUser, unitOfWork)
            ? await GraphQlMutationResolverService.UpdateEntity(
                unitOfWork,
                mapper,
                authenticatedUser!.UserId,
                userPatchDto
            )
            : null;
    }

    [Error(typeof(ReciperException))]
    [UseFirstOrDefault]
    [UseProjection]
    public async Task<IQueryable<User>> UpdateUserProfilePhoto(
        ReciperUnitOfWork unitOfWork,
        [Service] ICloudinary cloudinary,
        [GlobalState("CurrentUser")] AppActor<Guid>? authenticatedUser, IFile file
    )
    {
        try
        {
            var user = await unitOfWork.UsersRepository
                .StartQuery().Where(u => u.Id == authenticatedUser!.UserId)
                .Include(u => u.Images)
                .FirstOrDefaultAsync();

            if (user == null)
                throw new ReciperException("User not found");

            await using Stream stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.Name, stream)
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            await unitOfWork.BeginTransaction();
            var newPhoto = new UserImage
            {
                Order = 1,
                PublicId = uploadResult.PublicId,
                Url = uploadResult.Url.ToString(),
                CreatedAt = uploadResult.CreatedAt,
                User = user
            };
            var success = await unitOfWork.UserImagesRepository.Insert(newPhoto);
            if (!success)
                throw new ReciperException("Error while inserting photo to db");

            user.Images.Add(newPhoto);
            user.ProfilePictureUrl = newPhoto.Url;

            await unitOfWork.Commit();

            return unitOfWork.UsersRepository
                .StartQuery()
                .AsNoTracking()
                .Where(u => u.Id == authenticatedUser.UserId);
        }
        catch (Exception e)
        {
            throw new ReciperException(e.Message);
        }
    }
}