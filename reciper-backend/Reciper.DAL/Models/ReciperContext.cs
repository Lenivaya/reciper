using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Reciper.DAL.Models;

public class ReciperContext : DbContext
{
    public ReciperContext() { }

    public ReciperContext(DbContextOptions<ReciperContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Recipe> Recipes { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; } = null!;
    public DbSet<Rating> Ratings { get; set; } = null!;
    public DbSet<UserRole> UserRoles { get; set; } = null!;
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; } = null!;
    public DbSet<Ingredient> Ingredients { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;
    public DbSet<RecipeTag> RecipeTags { get; set; } = null!;
    public DbSet<RecipeImage> RecipeImages { get; set; } = null!;
    public DbSet<Role> Roles { get; set; } = null!;
    public DbSet<UserSubscription> UserSubscriptions { get; set; } = null!;
    public DbSet<RecipeLike> RecipeLikes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure composite keys for junction tables
        modelBuilder.Entity<RecipeIngredient>().HasKey(ri => new { ri.RecipeId, ri.IngredientId });

        modelBuilder.Entity<RecipeTag>().HasKey(rt => new { rt.RecipeId, rt.TagId });

        modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });

        modelBuilder
            .Entity<RecipeLike>()
            .HasOne(rl => rl.User)
            .WithMany(u => u.LikedRecipes)
            .HasForeignKey(rl => rl.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder
            .Entity<RecipeLike>()
            .HasOne(rl => rl.Recipe)
            .WithMany(r => r.Likes)
            .HasForeignKey(rl => rl.RecipeId)
            .OnDelete(DeleteBehavior.NoAction);

        // Configure UserSubscription relationships
        modelBuilder
            .Entity<UserSubscription>()
            .HasOne(us => us.Subscriber)
            .WithMany(u => u.Subscriptions)
            .HasForeignKey(us => us.SubscriberId)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder
            .Entity<UserSubscription>()
            .HasOne(us => us.Subscribee)
            .WithMany(u => u.Subscribers)
            .HasForeignKey(us => us.SubscribeeId)
            .OnDelete(DeleteBehavior.NoAction);

        // Configure timestamps for User
        modelBuilder
            .Entity<User>()
            .Property(user => user.CreatedAt)
            .HasDefaultValueSql("getdate()");
        modelBuilder
            .Entity<User>()
            .Property(b => b.UpdatedAt)
            .HasDefaultValueSql("getdate()")
            .ValueGeneratedOnAddOrUpdate()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

        // Configure timestamps for Recipe
        modelBuilder
            .Entity<Recipe>()
            .Property(recipe => recipe.CreatedAt)
            .HasDefaultValueSql("getdate()");
        modelBuilder
            .Entity<Recipe>()
            .Property(recipe => recipe.UpdatedAt)
            .HasDefaultValueSql("getdate()")
            .ValueGeneratedOnAddOrUpdate()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

        // Configure timestamps for Comment
        modelBuilder
            .Entity<Comment>()
            .Property(comment => comment.CreatedAt)
            .HasDefaultValueSql("getdate()");
        modelBuilder
            .Entity<Comment>()
            .Property(comment => comment.UpdatedAt)
            .HasDefaultValueSql("getdate()")
            .ValueGeneratedOnAddOrUpdate()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

        // Configure timestamps for Rating
        modelBuilder
            .Entity<Rating>()
            .Property(rating => rating.CreatedAt)
            .HasDefaultValueSql("getdate()");
        modelBuilder
            .Entity<Rating>()
            .Property(rating => rating.UpdatedAt)
            .HasDefaultValueSql("getdate()")
            .ValueGeneratedOnAddOrUpdate()
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);
    }
}
