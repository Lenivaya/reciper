namespace Reciper.BLL.Contracts;

/// <summary>
/// Represents a chainable element in a chain of responsibility pattern.
/// </summary>
/// <typeparam name="TChainElement">The type of elements in the chain.</typeparam>
public interface IChainable<TChainElement>
{
    /// <summary>
    /// Gets or sets the next handler in the chain.
    /// </summary>
    TChainElement? Next { get; set; }

    /// <summary>
    /// Sets the next handler in the chain and returns the current element.
    /// </summary>
    /// <param name="next">The next handler to be set.</param>
    /// <returns>The current chain element.</returns>
    TChainElement SetNextHandler(TChainElement next);

    /// <summary>
    /// Sets the next handler in the chain and returns the next element.
    /// </summary>
    /// <param name="next">The next handler to be set.</param>
    /// <returns>The next chain element that was added.</returns>
    TChainElement AddNextHandler(TChainElement next);
}
