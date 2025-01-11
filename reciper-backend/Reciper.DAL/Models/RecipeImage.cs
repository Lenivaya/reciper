using System.ComponentModel.DataAnnotations;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents an image associated with a recipe.
/// Multiple images can be associated with a single recipe and ordered using the Order property.
/// </summary>
public class RecipeImage
{
    /// <summary>
    /// Gets or sets the unique identifier for the recipe image.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the URL where the image is stored.
    /// </summary>
    [Required]
    public string Url { get; set; } = null!;

    /// <summary>
    /// Gets or sets the display order of the image within the recipe's image collection.
    /// Lower numbers appear first.
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// Gets or sets the ID of the recipe this image belongs to.
    /// </summary>
    public Guid RecipeId { get; set; }

    /// <summary>
    /// Gets or sets the recipe this image belongs to. Navigation property.
    /// </summary>
    public virtual Recipe Recipe { get; set; } = null!;
}
