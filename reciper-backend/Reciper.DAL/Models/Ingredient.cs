using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a unique ingredient that can be used in recipes.
/// Each ingredient name must be unique in the system.
/// </summary>
[Index(nameof(Name), IsUnique = true)]
public class Ingredient
{
    /// <summary>
    /// Gets or sets the unique identifier for the ingredient.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the unique name of the ingredient. Limited to 100 characters.
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    // Navigation properties
    /// <summary>
    /// Gets or sets the collection of recipe-ingredient relationships where this ingredient is used.
    /// </summary>
    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } =
        new List<RecipeIngredient>();
}
