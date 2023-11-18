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
        
        public static CartView ToCartView(this List<Cart> cartContents)
        {
            var cartItems = new List<CartItem>();
            foreach (var Item in cartContents)
            {
                cartItems.Add(new CartItem()
                {
                    id = Item.id,
                    title = Item.size.product.name,
                    size = Item.size.size,
                    colorWay = Item.size.product.colorway,
                    image = Item.size.product.image,
                    price = Item.size.price
                });
            }
            return new CartView()
            {
                items = cartItems,
                subtotal = cartItems.Sum(i => i.price)
            };
        }

        public static CountryView ToCountryView(this Country country)
        {
            return new CountryView()
            {
                shipping = country.shipping,
                tax = country.tax
            };
        }
        public static IEnumerable<CountryPreview> ToCountryPreview(this List<Country> countries)
        {
            foreach (var country in countries)
            {
                yield return new CountryPreview()
                {
                    id = country.id,
                    name = country.name
                };
            }
        }
    }
}
