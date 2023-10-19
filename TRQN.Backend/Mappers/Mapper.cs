using TRQN.Backend.Views;
using TRQN.Backend.Models;
using TRQN.Backend.Exceptions;

namespace TRQN.Backend.Mappers
{
    public static class Mapper
    {
        public static ProductInfo ToProductInfo(this Product product)
        {
            return new ProductInfo()
            {
                SKU = product.SKU,
                name = product.name,
                description = product.description,
                image = product.image,
                colorway = product.colorway,
                releaseDate = product.releaseDate,
                sizes = product.sizes
            };
        }

        public static IEnumerable<ProductCard> ToProductCards(this List<Product> products)
        {
            foreach (var product in products)
            {
                yield return new ProductCard()
                {
                    SKU = product.SKU,
                    name = product.name,
                    descriptionShort = product.descriptionShort,
                    image = product.image,
                    price = product.sizes.Min(p => p.price)
                };
            }
        }

        public static StatusCodeMessage ToHttpStatus<T>(this T exception) where T : ACustomException
        {
            return new StatusCodeMessage()
            {
                code = exception.code,
                message = exception.message
            };
        }
    }
}
