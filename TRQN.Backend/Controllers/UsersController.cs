using Microsoft.AspNetCore.Mvc;
using System;
using TRQN.Backend.Controllers.Extentions;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Services.Interface;
using TRQN.Backend.Views;

namespace TRQN.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserRepos users;
        private readonly ILogger<UsersController> logger;

        public UsersController(IUserRepos users, ILogger<UsersController> logger)
        {
            this.users = users;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserView userData)
        {
            var res = await users.CreateUser(userData.email, userData.password);
            return res.Match<IActionResult>(f =>
            {
                var CookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddHours(5),
                    Secure = true
                };
                Response.Cookies.Append("token", f.ToString(), new CookieOptions() { HttpOnly = true, Secure = true });
                return Ok();
            }, exception =>
            {
                var ex = (UserException)exception;
                return StatusCode(ex.code, ex.message);
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            if (!Request.Cookies.TryGetValue("token", out string? token) || await users.GetRole(token) != Models.Roles.admin)
            {
                return Unauthorized();
            }
            return Ok(await users.GetUsers());
        }
    }
}
