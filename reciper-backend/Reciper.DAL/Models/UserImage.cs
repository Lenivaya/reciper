using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Reciper.DAL.Contracts;

namespace Reciper.DAL.Models;

public class UserImage : ICloudinaryImage
{
    /// <summary>
    /// Gets or sets the unique identifier for the user image
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <inheritdoc />
    [Required]
    public string PublicId { get; set; } = null!;

    /// <inheritdoc />
    [Required]
    public string Url { get; set; } = null!;

    /// <summary>
    /// Gets or sets the display order of the image within the user image collection
    /// Lower numbers appear first.
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user this image belongs to.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the image was created
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the user this image belongs to. Navigation property.
    /// </summary>
    public virtual User User { get; set; } = null!;
}
