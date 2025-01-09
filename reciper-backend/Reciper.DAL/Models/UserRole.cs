using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

public class UserRole
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(Role))]
    public Guid RoleId { get; set; }

    // Navigation properties
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Role Role { get; set; } = null!;
}
