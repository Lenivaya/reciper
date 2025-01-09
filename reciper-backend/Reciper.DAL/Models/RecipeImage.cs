using System.ComponentModel.DataAnnotations;

namespace Reciper.DAL.Models;

public class RecipeImage
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Url { get; set; } = null!;

    public int Order { get; set; }

    public Guid RecipeId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;
}
