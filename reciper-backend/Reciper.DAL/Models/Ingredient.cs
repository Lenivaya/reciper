using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

[Index(nameof(Name), IsUnique = true)]
public class Ingredient
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } =
        new List<RecipeIngredient>();
}
