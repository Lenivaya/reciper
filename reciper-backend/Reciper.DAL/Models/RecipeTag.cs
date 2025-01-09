namespace Reciper.DAL.Models;

public class RecipeTag
{
    public Guid RecipeId { get; set; }
    public Guid TagId { get; set; }

    // Navigation properties
    public virtual Recipe Recipe { get; set; } = null!;
    public virtual Tag Tag { get; set; } = null!;
}
