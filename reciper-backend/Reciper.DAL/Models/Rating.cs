using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a user's rating for a recipe. Each user can only rate a recipe once.
/// </summary>
[Index(nameof(UserId), nameof(RecipeId), IsUnique = true)]
public class Rating
{
    /// <summary>
    /// Gets or sets the unique identifier for the rating.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the rating value given by the user. Must be between 1 and 5.
    /// </summary>
    [Required]
    [Range(1, 5)]
    public int Value { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the rating was created. Automatically generated.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the rating was last updated. Automatically computed.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who created the rating.
    /// </summary>
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the recipe being rated.
    /// </summary>
    [ForeignKey(nameof(Recipe))]
    public Guid RecipeId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the user who created the rating. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    /// <summary>
    /// Gets or sets the recipe being rated. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;
}
