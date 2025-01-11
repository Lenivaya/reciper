using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents the relationship between a recipe and an ingredient, including the amount of the ingredient needed.
/// This is a junction table that connects Recipe and Ingredient entities.
/// </summary>
public class RecipeIngredient
{
    /// <summary>
    /// Gets or sets the unique identifier for the recipe-ingredient relationship.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the amount of the ingredient needed in the recipe (e.g., "2 tablespoons", "1 cup").
    /// </summary>
    [Required]
    public string Amount { get; set; } = null!;

    /// <summary>
    /// Gets or sets the ID of the recipe that uses this ingredient.
    /// </summary>
    [ForeignKey(nameof(Recipe))]
    public Guid RecipeId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the ingredient used in the recipe.
    /// </summary>
    [ForeignKey(nameof(Ingredient))]
    public Guid IngredientId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the recipe that uses this ingredient. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;

    /// <summary>
    /// Gets or sets the ingredient used in the recipe. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Ingredient Ingredient { get; set; } = null!;
}
