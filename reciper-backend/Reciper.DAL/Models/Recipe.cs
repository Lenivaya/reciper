using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models.Enums;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a recipe in the system with its complete details including ingredients, instructions, and related data.
/// </summary>
[Index(nameof(Title))]
public class Recipe
{
    /// <summary>
    /// Gets or sets the unique identifier for the recipe.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the recipe. Limited to 200 characters.
    /// </summary>
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;

    /// <summary>
    /// Gets or sets the detailed description of the recipe.
    /// </summary>
    [Required]
    public string Description { get; set; } = null!;

    /// <summary>
    /// Gets or sets the step-by-step cooking instructions for the recipe.
    /// </summary>
    [Required]
    public string Instructions { get; set; } = null!;

    /// <summary>
    /// Gets or sets the total cooking time required for the recipe in minutes.
    /// </summary>
    public int CookingTimeMinutes { get; set; }

    /// <summary>
    /// Gets or sets the difficulty level of the recipe.
    /// </summary>
    public DifficultyLevel DifficultyLevel { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the recipe was created. Automatically generated.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the recipe was last updated. Automatically computed.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who created the recipe.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the user who created the recipe. Navigation property.
    /// </summary>
    public virtual User User { get; set; } = null!;

    /// <summary>
    /// Gets or sets the collection of ingredients associated with this recipe, including their quantities.
    /// </summary>
    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } =
        new List<RecipeIngredient>();

    /// <summary>
    /// Gets or sets the collection of tags associated with this recipe.
    /// </summary>
    public virtual ICollection<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();

    /// <summary>
    /// Gets or sets the collection of images associated with this recipe.
    /// </summary>
    public virtual ICollection<RecipeImage> Images { get; set; } = new List<RecipeImage>();

    /// <summary>
    /// Gets or sets the collection of user comments on this recipe.
    /// </summary>
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    /// <summary>
    /// Gets or sets the collection of user ratings for this recipe.
    /// </summary>
    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    /// <summary>
    /// Gets or sets the collection of user likes for this recipe.
    /// </summary>
    public virtual ICollection<RecipeLike> Likes { get; set; } = new List<RecipeLike>();
}
