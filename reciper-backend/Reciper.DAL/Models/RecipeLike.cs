using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

[Index(nameof(UserId), nameof(RecipeId), IsUnique = true)]
public class RecipeLike
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public Guid RecipeId { get; set; }

    [ForeignKey(nameof(UserId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    [ForeignKey(nameof(RecipeId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Recipe Recipe { get; set; } = null!;
}
