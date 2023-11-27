using Microsoft.AspNetCore.Mvc;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Services.Interface;
using TRQN.Backend.Mappers;
using LanguageExt;
using TRQN.Backend.Controllers.Extentions;

namespace TRQN.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductsRepos products;
        private readonly ILogger logger;

        public ProductsController(IProductsRepos products, ILogger<ProductsController> logger)
        {
            this.products = products;
            this.logger = logger;
        }
        
        [HttpGet("random={count:int}")]
        public async Task<IActionResult> GetRandomProducts(int count)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await products.GetRandomProducts(count);
            return Ok(res);
        }

        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 3600)]
        [HttpGet("category={catid:Int}")]
        public async Task<IActionResult> GetCategoryProducts(int catid)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await products.GetProducts(catid);
            return res.ToResponse(r => r.ToHttpStatus());
        }

        [HttpGet("{SKU}")]
        public async Task<IActionResult> GetProduct(string SKU)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await products.GetProductInfo(SKU);
            return res.ToResponse(r => r.ToHttpStatus());

        }

        [HttpGet("search/{productName}")]
        public async Task<IActionResult> Search(string productName)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await products.GetProducts(productName);
            return Ok(res);
        }
    }
}
