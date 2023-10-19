using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using TRQN.Backend.Services.Interface;

namespace TRQN.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : Controller
    {
        private readonly IFilesRepos files;
        private readonly ILogger<FilesController> logger;

        public FilesController(IFilesRepos files, ILogger<FilesController> logger)
        {
            this.files = files;
            this.logger = logger;
        }

        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 3600)]
        [HttpGet("images/{file}")]
        public async Task<IActionResult> GetImage(string file)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await files.GetImage(file);
            return res.Match<ActionResult>(f =>
            {
                return Ok(f);
            }, exception =>
            {
                if (exception is FileNotFoundException)
                {
                    return NotFound();
                }
                else
                    return StatusCode(500);
            });
        }


    }
}
