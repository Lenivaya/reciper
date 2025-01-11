using System.ComponentModel.DataAnnotations;

namespace Reciper.BLL.DTO;

public record IngredientCreateDTO
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;
}

public record IngredientPatchDTO
{
    [MaxLength(100)]
    public string? Name { get; set; }
}
