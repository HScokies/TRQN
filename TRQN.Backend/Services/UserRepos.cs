using LanguageExt;
using LanguageExt.Common;
using Microsoft.EntityFrameworkCore;
using TRQN.Backend.Data;
using TRQN.Backend.Exceptions;
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


        public async Task<Result<bool>> Authorize(string email, string password)
        {
            string passwordEncrypted = encryption.Encrypt(password);
            var res = await ctx.users.FirstOrDefaultAsync(u => u.email == email);
            if (res is null)
            {
                var ex = new UserException();
                return new Result<bool>(ex);
            }
            if (res.password != passwordEncrypted)
            {
                var ex = new UserException(StatusCodes.Status401Unauthorized, "Invalid credentials");
                return new Result<bool>(ex);
            }
            return true;
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
    }
}
