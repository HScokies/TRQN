using LanguageExt.Common;

namespace TRQN.Backend.Services.Interface
{
    public interface IFilesRepos
    {
        Task<Result<MemoryStream>> GetImage(string file);

        bool isAllowedFormat(string ext);
        void RemoveOldAvatar(string file);
        Task AddNewAvatar(string filename, IFormFile image);
    }
}
