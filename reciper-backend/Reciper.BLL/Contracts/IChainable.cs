namespace Reciper.BLL.Contracts;

public interface IChainable<TChainElement>
{
    TChainElement? Next { get; set; }

    /// <summary>
    ///     Sets next handler returning current chain element
    /// </summary>
    /// <param name="next"></param>
    /// <returns></returns>
    TChainElement SetNextHandler(TChainElement next);

    /// <summary>
    ///     Sets next handler returning next chain element
    /// </summary>
    /// <param name="next"></param>
    /// <returns></returns>
    TChainElement AddNextHandler(TChainElement next);
}
