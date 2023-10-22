using LanguageExt.Common;
using TRQN.Backend.Models;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services.Interface
{
    public interface IUserRepos
    {
        public Task<Result<Guid>> CreateUser(string email, string password);
        public Task<Result<bool>> Authorize(string email, string password);
        public Task<List<UserView>> GetUsers();
        public Task<Roles?> GetRole(string token);
    }
}
