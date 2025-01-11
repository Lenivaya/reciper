using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

[Index(nameof(SubscriberId), nameof(SubscribeeId), IsUnique = true)]
public class UserSubscription
{
    [Key]
    public Guid Id { get; set; }

    public Guid SubscriberId { get; set; }
    public Guid SubscribeeId { get; set; }

    [ForeignKey(nameof(SubscriberId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User Subscriber { get; set; } = null!;

    [ForeignKey(nameof(SubscribeeId))]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public virtual User Subscribee { get; set; } = null!;
}
