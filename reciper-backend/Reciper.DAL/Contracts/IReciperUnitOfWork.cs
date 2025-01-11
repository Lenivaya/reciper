using Reciper.DAL.Models;

namespace Reciper.DAL.Contracts;

public interface IReciperUnitOfWork : IUnitOfWork
{
    public IEntityRepository<User, Guid> UsersRepository { get; }
    public IEntityRepository<Recipe, Guid> RecipesRepository { get; }
    public IEntityRepository<Comment, Guid> CommentsRepository { get; }
    public IEntityRepository<Rating, Guid> RatingsRepository { get; }
    public IEntityRepository<UserRole, Guid> UserRolesRepository { get; }
    public IEntityRepository<RecipeIngredient, Guid> RecipeIngredientsRepository { get; }
    public IEntityRepository<Ingredient, Guid> IngredientsRepository { get; }
    public IEntityRepository<Tag, Guid> TagsRepository { get; }
    public IEntityRepository<RecipeTag, Guid> RecipeTagsRepository { get; }
    public IEntityRepository<RecipeImage, Guid> RecipeImagesRepository { get; }
    public IEntityRepository<Role, Guid> RolesRepository { get; }
    public IEntityRepository<UserSubscription, Guid> SubscriptionsRepository { get; }
    public IEntityRepository<RecipeLike, Guid> RecipeLikesRepository { get; }
}