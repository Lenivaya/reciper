using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

[Index(nameof(Name), IsUnique = true)]
public class Role
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
