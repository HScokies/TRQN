using LanguageExt.Common;

namespace TRQN.Backend.Services.Interface
{
    public interface IFilesRepos
    {
        Task<Result<MemoryStream>> GetImage(string file);
    }
}
