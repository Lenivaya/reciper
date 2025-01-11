using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a subscription relationship between two users.
/// A user (Subscriber) can follow another user (Subscribee). Each subscription relationship must be unique.
/// </summary>
[Index(nameof(SubscriberId), nameof(SubscribeeId), IsUnique = true)]
public class UserSubscription
{
    /// <summary>
    /// Gets or sets the unique identifier for the subscription relationship.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who is following (the subscriber).
    /// </summary>
    public Guid SubscriberId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user being followed (the subscribee).
    /// </summary>
    public Guid SubscribeeId { get; set; }

    /// <summary>
    /// Gets or sets the user who is following. Navigation property with no action on delete.
    /// </summary>
    [ForeignKey(nameof(SubscriberId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User Subscriber { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user being followed. Navigation property with no action on delete.
    /// </summary>
    [ForeignKey(nameof(SubscribeeId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User Subscribee { get; set; } = null!;
}
