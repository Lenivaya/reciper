using System.ComponentModel.DataAnnotations;

namespace Reciper.BLL.DTO;

public record TagCreateDTO
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;
}

public record TagPatchDTO
{
    [MaxLength(50)]
    public string? Name { get; set; }
}
