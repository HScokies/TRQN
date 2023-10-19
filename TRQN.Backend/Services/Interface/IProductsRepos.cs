using LanguageExt.Common;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services.Interface
{
    public interface IProductsRepos
    {
        public Task<Result<IEnumerable<ProductCard>>> GetProducts(int category);
        public Task<Result<ProductInfo>> GetProductInfo(string SKU);
    }
}
