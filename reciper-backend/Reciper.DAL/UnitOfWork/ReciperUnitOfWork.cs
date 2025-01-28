using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reciper.DAL.Contracts;
using Reciper.DAL.Models;
using Reciper.DAL.Repositories;

namespace Reciper.DAL.UnitOfWork;

public class ReciperUnitOfWork : UnitOfWork<ReciperContext>, IReciperUnitOfWork
{
    public ReciperUnitOfWork(
        IDbContextFactory<ReciperContext> context,
        ILogger<ReciperUnitOfWork> logger
    )
        : base(context, logger)
    {
        InitializeRepositories(Context, Logger);
    }

    public ReciperUnitOfWork(ReciperContext context, ILogger<ReciperUnitOfWork> logger)
        : base(context, logger)
    {
        InitializeRepositories(Context, Logger);
    }

    public IEntityRepository<User, Guid> UsersRepository { get; private set; }
    public IEntityRepository<Recipe, Guid> RecipesRepository { get; private set; }
    public IEntityRepository<Comment, Guid> CommentsRepository { get; private set; }
    public IEntityRepository<Rating, Guid> RatingsRepository { get; private set; }
    public IEntityRepository<UserRole, Guid> UserRolesRepository { get; private set; }
    public IEntityRepository<RecipeIngredient, Guid> RecipeIngredientsRepository
    {
        get;
        private set;
    }
    public IEntityRepository<Ingredient, Guid> IngredientsRepository { get; private set; }
    public IEntityRepository<Tag, Guid> TagsRepository { get; private set; }
    public IEntityRepository<RecipeTag, Guid> RecipeTagsRepository { get; private set; }
    public IEntityRepository<RecipeImage, Guid> RecipeImagesRepository { get; private set; }
    public IEntityRepository<UserImage, Guid> UserImagesRepository { get; private set; }
    public IEntityRepository<Role, Guid> RolesRepository { get; private set; }
    public IEntityRepository<UserSubscription, Guid> SubscriptionsRepository { get; private set; }
    public IEntityRepository<RecipeLike, Guid> RecipeLikesRepository { get; private set; }

    private void InitializeRepositories(ReciperContext context, ILogger logger)
    {
        UsersRepository = new GuidGenericRepository<User>(context, logger);
        RecipesRepository = new GuidGenericRepository<Recipe>(context, logger);
        CommentsRepository = new GuidGenericRepository<Comment>(context, logger);
        RatingsRepository = new GuidGenericRepository<Rating>(context, logger);
        UserRolesRepository = new GuidGenericRepository<UserRole>(context, logger);
        RecipeIngredientsRepository = new GuidGenericRepository<RecipeIngredient>(context, logger);
        IngredientsRepository = new GuidGenericRepository<Ingredient>(context, logger);
        TagsRepository = new GuidGenericRepository<Tag>(context, logger);
        RecipeTagsRepository = new GuidGenericRepository<RecipeTag>(context, logger);
        RecipeImagesRepository = new GuidGenericRepository<RecipeImage>(context, logger);
        UserImagesRepository = new GuidGenericRepository<UserImage>(context, logger);
        RolesRepository = new GuidGenericRepository<Role>(context, logger);
        SubscriptionsRepository = new GuidGenericRepository<UserSubscription>(context, logger);
        RecipeLikesRepository = new GuidGenericRepository<RecipeLike>(context, logger);
    }
}
