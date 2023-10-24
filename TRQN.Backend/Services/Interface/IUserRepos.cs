using LanguageExt.Common;
using TRQN.Backend.Models;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services.Interface
{
    public interface IUserRepos
    {
        public Task<Result<Guid>> CreateUser(string email, string password);
        public Task<Result<string>> Authorize(string email, string password);
        public Task<Result<bool>> AddToCart(string token, int sizeId);
        public Task<CartView> GetCart(string token);
        public Task<Result<bool>> RemoveFromCart(string token, int cartId);

        public Task<Roles?> GetRole(string token);
        public Task<List<UserView>> GetUsers();
        public Task<List<UserView>> SearchUsers(string email);
    }
}
