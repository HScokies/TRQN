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
using static System.Net.Mime.MediaTypeNames;

namespace TRQN.Backend.Services
{
    public class UserRepos : IUserRepos
    {
        private readonly AppDbContext ctx;
        private readonly IBlowfishEncryption encryption;
        private readonly IFilesRepos files;

        public UserRepos(AppDbContext ctx, IBlowfishEncryption encryption, IFilesRepos files)
        {
            this.ctx = ctx;
            this.encryption = encryption;
            this.files = files;
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

        public async Task<Result<bool>> SetUserData(string token, UserDataInput data)
        {
            var country = await ctx.countries.FirstOrDefaultAsync(c => c.id == data.countryId);
            if (country is null)
            {
                var ex = new UserException(StatusCodes.Status404NotFound,"Specified country cannot be found");
                return new Result<bool>(ex);
            }

            var res = await ctx.users.FirstOrDefaultAsync(u => u.token.ToString() == token);
            if (res is null)
            {
                var ex = new UserException();
                return new Result<bool>(ex);
            }
            
            if (data.image != null)
            {
                string ext = Path.GetExtension(data.image.FileName);
                if (!files.isAllowedFormat(ext))
                {
                    var ex = new UserException(StatusCodes.Status400BadRequest, "Invalid avatar format");
                    return new Result<bool>(ex);
                }
                files.RemoveOldAvatar(res.avatar);

                string newFileName = $"{res.id}avatar{ext}";
                await files.AddNewAvatar(newFileName, data.image);
                res.avatar = newFileName;
            }

            res.fullName = data.fullName;
            res.street = data.street;
            res.apartment = data.apartment;
            res.city = data.city;
            res.zip = data.zip;
            res.countryId = data.countryId;
            res.telephone = data.telephone;

            res.country = country;
            res.countryId = data.countryId;

            await ctx.SaveChangesAsync();
            return new Result<bool>(true);
        }
        public async Task<Result<ProfileView>> GetProfile(string token)
        {
            var res = await ctx.users.Include(c => c.country).FirstOrDefaultAsync(u => u.token.ToString() == token);
            if (res is null)
            {
                var ex = new UserException();
                return new Result<ProfileView>(ex);
            }
            return new Result<ProfileView>(res.ToProfileView());
        }

    }
}
