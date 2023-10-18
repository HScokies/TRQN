﻿using LanguageExt.Common;
using TRQN.Backend.Services.Interface;

namespace TRQN.Backend.Services
{
    public class FileRepos : IFilesRepos
    {
        private readonly IWebHostEnvironment env;

        public FileRepos(IWebHostEnvironment env)
        {
            this.env = env;
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
    }
}
