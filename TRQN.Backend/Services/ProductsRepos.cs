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
            var res = await ctx.products.Include(p => p.sizes.OrderBy(s => s.size)).FirstOrDefaultAsync(p => p.SKU == SKU);
            if (res is null)
            {
                var ProductNotFound = new ProductException();
                return new Result<ProductInfo>(ProductNotFound);
            
            }
            res.sizes.ForEach(e =>
            {
                e.product = null!;
            });

            return new Result<ProductInfo>(res.ToProductInfo());
        }

        public async Task<Result<IEnumerable<ProductCard>>> GetProducts(int category)
        {
            var products = await ctx.products.Include(p => p.sizes).Where(p => p.category.id == category && p.sizes.Any()).ToListAsync();
            if (!products.Any())
            {
                var ProductNotFound = new ProductException("The specified category does not contain any products");
                return new Result<IEnumerable<ProductCard>>(ProductNotFound);
            }
            return new Result<IEnumerable<ProductCard>>(products.ToProductCards());
        }

        public async Task<IEnumerable<ProductCard>> GetProducts(string search)
        {
            var products = await ctx.products.Include(p => p.sizes).Where(p => p.name.ToLower().Contains(search.ToLower())).ToListAsync();
            return products.ToProductCards();
        }

        public async Task<IEnumerable<ProductCard>> GetRandomProducts(int count)
        {
            var products = await ctx.products.Include(p => p.sizes).OrderBy(o => Guid.NewGuid()).Take(count).ToListAsync();
            return products.ToProductCards();
        }
    }
}
