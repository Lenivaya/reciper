using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a user's comment on a recipe.
/// </summary>
public class Comment
{
    /// <summary>
    /// Gets or sets the unique identifier for the comment.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the text content of the comment.
    /// </summary>
    [Required]
    public string Content { get; set; } = null!;

    /// <summary>
    /// Gets or sets the timestamp when the comment was created. Automatically generated.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the comment was last updated. Automatically computed.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who created the comment.
    /// </summary>
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the recipe being commented on.
    /// </summary>
    [ForeignKey(nameof(Recipe))]
    public Guid RecipeId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the user who created the comment. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    /// <summary>
    /// Gets or sets the recipe being commented on. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;
}
