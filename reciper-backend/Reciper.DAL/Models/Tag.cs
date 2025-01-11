using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a tag that can be used to categorize recipes.
/// Each tag name must be unique in the system.
/// </summary>
[Index(nameof(Name), IsUnique = true)]
public class Tag
{
    /// <summary>
    /// Gets or sets the unique identifier for the tag.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the unique name of the tag. Limited to 50 characters.
    /// </summary>
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    // Navigation properties
    /// <summary>
    /// Gets or sets the collection of recipe-tag relationships where this tag is used.
    /// </summary>
    public virtual ICollection<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
}
