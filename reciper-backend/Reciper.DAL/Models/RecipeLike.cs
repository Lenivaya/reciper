using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a user's like on a recipe.
/// Each user can only like a recipe once, enforced by a unique index.
/// </summary>
[Index(nameof(UserId), nameof(RecipeId), IsUnique = true)]
public class RecipeLike
{
    /// <summary>
    /// Gets or sets the unique identifier for the recipe like.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who liked the recipe.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the recipe that was liked.
    /// </summary>
    public Guid RecipeId { get; set; }

    /// <summary>
    /// Gets or sets the user who liked the recipe. Navigation property with no action on delete.
    /// </summary>
    [ForeignKey(nameof(UserId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    /// <summary>
    /// Gets or sets the recipe that was liked. Navigation property with no action on delete.
    /// </summary>
    [ForeignKey(nameof(RecipeId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;
}
