using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

public class Rating
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [Range(1, 5)]
    public int Value { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(Recipe))]
    public Guid RecipeId { get; set; }

    // Navigation properties
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;
}
