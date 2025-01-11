using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models.Enums;

namespace Reciper.DAL.Models;

[Index(nameof(Title))]
public class Recipe
{
    [Key] public Guid Id { get; set; }

    [Required] [MaxLength(200)] public string Title { get; set; } = null!;

    [Required] public string Description { get; set; } = null!;

    [Required] public string Instructions { get; set; } = null!;

    public int CookingTimeMinutes { get; set; }

    public DifficultyLevel DifficultyLevel { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    public Guid UserId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } =
        new List<RecipeIngredient>();

    public virtual ICollection<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
    public virtual ICollection<RecipeImage> Images { get; set; } = new List<RecipeImage>();
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    public virtual ICollection<RecipeLike> Likes { get; set; } = new List<RecipeLike>();
}