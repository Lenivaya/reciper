namespace Reciper.DAL.Models;

/// <summary>
/// Represents the many-to-many relationship between recipes and tags.
/// This is a junction table that connects Recipe and Tag entities.
/// </summary>
public class RecipeTag
{
    /// <summary>
    /// Gets or sets the ID of the recipe being tagged.
    /// </summary>
    public Guid RecipeId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the tag assigned to the recipe.
    /// </summary>
    public Guid TagId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the recipe being tagged. Navigation property.
    /// </summary>
    public virtual Recipe Recipe { get; set; } = null!;

    /// <summary>
    /// Gets or sets the tag assigned to the recipe. Navigation property.
    /// </summary>
    public virtual Tag Tag { get; set; } = null!;
}
