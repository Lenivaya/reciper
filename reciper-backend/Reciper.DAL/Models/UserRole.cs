using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents the many-to-many relationship between users and roles.
/// This is a junction table that connects User and Role entities for authorization purposes.
/// </summary>
public class UserRole
{
    /// <summary>
    /// Gets or sets the unique identifier for the user-role relationship.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user being assigned a role.
    /// </summary>
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the role being assigned to the user.
    /// </summary>
    [ForeignKey(nameof(Role))]
    public Guid RoleId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the user being assigned a role. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User User { get; set; } = null!;

    /// <summary>
    /// Gets or sets the role being assigned to the user. Navigation property with no action on delete.
    /// </summary>
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual Role Role { get; set; } = null!;
}
