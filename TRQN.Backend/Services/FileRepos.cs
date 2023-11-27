using LanguageExt.Common;
using System.IO;
using TRQN.Backend.Services.Interface;
using static System.Net.Mime.MediaTypeNames;

namespace TRQN.Backend.Services
{
    public class FileRepos : IFilesRepos
    {
        private readonly IWebHostEnvironment env;

        public FileRepos(IWebHostEnvironment env)
        {
            this.env = env;
        }

        public async Task AddNewAvatar(string filename, IFormFile image)
        {
            string path = Path.Combine(env.WebRootPath, "images", filename);
            await using (FileStream fs = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }
        }

        public async Task<Result<MemoryStream>> GetImage(string file)
        {
            string filePath = Path.Combine(env.WebRootPath, "images", file);
            if (!File.Exists(filePath))
            {
                var NotFoundException = new FileNotFoundException($"images/{file} cannot be found");
                return new Result<MemoryStream>(NotFoundException);
            }

            var mem = new MemoryStream();
            using(var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(mem);
            }
            mem.Position = 0;
            return new Result<MemoryStream>(mem);
        }

        public bool isAllowedFormat(string ext)
        {
            string[] AllowedExtentions = { ".jpg", ".png" };
            if (!AllowedExtentions.Contains(ext))
            {
                return false;
            }
            return true;
        }

        public void RemoveOldAvatar(string image)
        {
            if (image == "defaultavatar.jpg")
                return;

            string path = Path.Combine(env.WebRootPath, "images", image);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}
