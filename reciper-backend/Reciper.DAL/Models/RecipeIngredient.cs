using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

public class RecipeIngredient
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Amount { get; set; } = null!;

    [ForeignKey(nameof(Recipe))]
    public Guid RecipeId { get; set; }

    [ForeignKey(nameof(Ingredient))]
    public Guid IngredientId { get; set; }

    // Navigation properties
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Ingredient Ingredient { get; set; } = null!;
}
