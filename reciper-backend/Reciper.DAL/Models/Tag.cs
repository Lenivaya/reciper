using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

[Index(nameof(Name), IsUnique = true)]
public class Tag
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
}
