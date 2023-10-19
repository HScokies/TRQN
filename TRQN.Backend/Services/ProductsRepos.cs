using LanguageExt.Common;
using Microsoft.EntityFrameworkCore;
using TRQN.Backend.Data;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Services.Interface;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services
{
    public class ProductsRepos : IProductsRepos
    {
        private readonly AppDbContext ctx;

        public ProductsRepos(AppDbContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<Result<ProductInfo>> GetProductInfo(string SKU)
        {
            var res = await ctx.products.Include(p => p.sizes).FirstOrDefaultAsync(p => p.SKU == SKU);
            if (res is null)
            {
                var ProductNotFound = new ProductNotFoundException();
                return new Result<ProductInfo>(ProductNotFound);
            }
            return new Result<ProductInfo>(res.ToProductInfo());
        }

        public async Task<Result<IEnumerable<ProductCard>>> GetProducts(int category)
        {
            var products = await ctx.products.Include(p => p.sizes).Where(p => p.category.id == category && p.sizes.Any()).ToListAsync();
            if (!products.Any())
            {
                var ProductNotFound = new ProductNotFoundException("The specified category does not contain any products");
                return new Result<IEnumerable<ProductCard>>(ProductNotFound);
            }
            return new Result<IEnumerable<ProductCard>>(products.ToProductCards());
        }
    }
}
