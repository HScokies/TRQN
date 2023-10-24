using LanguageExt;
using LanguageExt.Common;
using LanguageExt.Pipes;
using Microsoft.EntityFrameworkCore;
using TRQN.Backend.Data;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Models;
using TRQN.Backend.Services.Interface;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services
{
    public class UserRepos : IUserRepos
    {
        private readonly AppDbContext ctx;
        private readonly IBlowfishEncryption encryption;

        public UserRepos(AppDbContext ctx, IBlowfishEncryption encryption)
        {
            this.ctx = ctx;
            this.encryption = encryption;
        }

        public async Task<Result<bool>> AddToCart(string token, int sizeId)
        {
            var product = await ctx.sizes.FirstOrDefaultAsync(p => p.id == sizeId);
            var user = await ctx.users.FirstOrDefaultAsync(u => u.token.ToString() == token);
            // await product; await user;
            if (product is null)
            {
                var ex = new ProductException();
                return new Result<bool>(ex);
            }
            if (user is null)
            {
                var ex = new UserException();
                return new Result<bool>(ex);
            }
            var res = await ctx.cart.AddAsync(new Cart() { sizeId = sizeId, userId = user.id });
            await ctx.SaveChangesAsync();
            return new Result<bool>(true);
        }

        public async Task<Result<string>> Authorize(string email, string password)
        {
            string passwordEncrypted = encryption.Encrypt(password);
            var res = await ctx.users.FirstOrDefaultAsync(u => u.email == email);
            if (res is null)
            {
                var ex = new UserException();
                return new Result<string>(ex);
            }
            if (res.password != passwordEncrypted)
            {
                var ex = new UserException(StatusCodes.Status401Unauthorized, "Invalid credentials");
                return new Result<string>(ex);
            }
            return new Result<string>(res.token.ToString());
        }

        public async Task<Result<Guid>> CreateUser(string email, string password)
        {    
            if (await ctx.users.FirstOrDefaultAsync(u => u.email == email) is not null)
            {
                var ex = new UserException(StatusCodes.Status400BadRequest, "User with specified email already exists");
                return new Result<Guid>(ex);
            }
            string passwordEncrypted = encryption.Encrypt(password);
            Guid token = Guid.NewGuid();
            var role = Roles.user;

            await ctx.users.AddAsync(new Models.User { 
                email = email,
                password = passwordEncrypted,
                token = token,
                role = role
            });
            await ctx.SaveChangesAsync();
            return new Result<Guid>(token);
        }

        public async Task<CartView> GetCart(string token)
        {
            var cartItems = await ctx.cart.Include(s => s.size).Include(p => p.size.product).Where(c => c.user.token.ToString() == token).ToListAsync();
            return cartItems.ToCartView();
        }

        public async Task<Roles?> GetRole(string token) => await ctx.users.FirstOrDefaultAsync(u => u.token.ToString() == token).Select(u => u?.role);

        public async Task<List<UserView>> GetUsers()
        {
            var users = await ctx.users.Where(u => u.role == Roles.user).ToListAsync();
            var res = new List<UserView>();
            foreach (var user in users)
            {
                res.Add(new UserView { email = user.email, password = encryption.Decrypt(user.password) });
            }
            return res;
        }

        public async Task<Result<bool>> RemoveFromCart(string token, int cartId)
        {
            var product = await ctx.cart.Include(u => u.user).FirstOrDefaultAsync(c => c.id == cartId);
            if (product is null)
            {
                var ex = new ProductException();
                return new Result<bool>(ex);
            }
            if (product.user.token.ToString() != token)
            {
                var ex = new UserException(StatusCodes.Status403Forbidden, "Invalid credentials");
                return new Result<bool>(ex);
            }
            ctx.cart.Remove(product);
            await ctx.SaveChangesAsync();
            return new Result<bool>(true);
        }

        public async Task<List<UserView>> SearchUsers(string email)
        {
            var users = await ctx.users.Where(u => u.email.ToLower().Contains(email.ToLower()) && u.role == Roles.user).ToListAsync();

            var res = new List<UserView>();
            foreach (var user in users)
            {
                res.Add(new UserView { email = user.email, password = encryption.Decrypt(user.password) });
            }
            return res;
        }
    }
}
