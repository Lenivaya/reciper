namespace Reciper.DAL.Contracts;

public interface ICloudinaryImage
{
    /// <summary>
    /// Public id used in cloudinary
    /// </summary>
    public string PublicId { get; set; }

    /// <summary>
    ///  Url of the image
    /// </summary>
    public string Url { get; set; }
}