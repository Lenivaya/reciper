using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Reciper.DAL.Models;

/// <summary>
/// Represents a user in the system with their profile information and related data.
/// </summary>
[Index(nameof(Email), IsUnique = true)]
[Index(nameof(Username), IsUnique = true)]
public class User
{
    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the unique username for the user. Limited to 50 characters.
    /// </summary>
    [Required]
    [MaxLength(50)]
    public string Username { get; set; } = null!;

    /// <summary>
    /// Gets or sets the unique email address for the user. Limited to 255 characters.
    /// </summary>
    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; set; } = null!;

    /// <summary>
    /// Gets or sets the hashed password for the user. Limited to 255 characters.
    /// </summary>
    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = null!;

    /// <summary>
    /// Gets or sets the URL of the user's profile picture. Optional, limited to 255 characters.
    /// </summary>
    [MaxLength(255)]
    public string? ProfilePictureUrl { get; set; }

    /// <summary>
    /// Gets or sets the user's biography. Optional, limited to 500 characters.
    /// </summary>
    [MaxLength(500)]
    public string? Bio { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the user account is active.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the timestamp when the user account was created. Automatically generated.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the user account was last updated. Automatically computed.
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the collection of recipes created by the user.
    /// </summary>
    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    /// <summary>
    /// Gets or sets the collection of comments made by the user.
    /// </summary>
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    /// <summary>
    /// Gets or sets the collection of ratings given by the user.
    /// </summary>
    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    /// <summary>
    /// Gets or sets the collection of roles assigned to the user.
    /// </summary>
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    /// <summary>
    /// Gets or sets the collection of users this user is subscribed to.
    /// </summary>
    public virtual ICollection<UserSubscription> Subscriptions { get; set; } =
        new List<UserSubscription>();

    /// <summary>
    /// Gets or sets the collection of users who are subscribed to this user.
    /// </summary>
    public virtual ICollection<UserSubscription> Subscribers { get; set; } =
        new List<UserSubscription>();

    /// <summary>
    /// Gets or sets the collection of recipes liked by the user.
    /// </summary>
    public virtual ICollection<RecipeLike> LikedRecipes { get; set; } = new List<RecipeLike>();
}
