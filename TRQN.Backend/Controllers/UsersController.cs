using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using TRQN.Backend.Controllers.Extentions;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Models;
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

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromForm]UserView userData)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await users.CreateUser(userData.email, userData.password);
            return res.Match<IActionResult>(f =>
            {   
                Response.Cookies.Append("token", f.ToString(), new CookieOptions() { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None });
                return Ok();
            }, exception =>
            {
                var ex = (UserException)exception;
                return StatusCode(ex.code, ex.ToHttpStatus());
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm]UserView userData)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            var res = await users.Authorize(userData.email, userData.password);
            res.IfSucc(f =>
            {
                Response.Cookies.Append("token", f, new CookieOptions() { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None });
            });
            return res.ToResponse(r => r.ToHttpStatus());
        }

        [HttpPost("cart/{sizeId:int}")]
        public async Task<IActionResult> AddToCart(int sizeId)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.AddToCart(token, sizeId);
            return res.ToResponse(r => r.ToHttpStatus());
        }

        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.GetCart(token);
            return Ok(res);
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            Response.Cookies.Delete("token");
            return NoContent();
        }


        [HttpPost("profile")]
        public async Task<IActionResult> SetUserData([FromForm]UserDataInput data)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.SetUserData(token, data);
            return res.ToResponse(r => r.ToHttpStatus());
        }
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.GetProfile(token);
            return res.ToResponse(r => r.ToHttpStatus());
        }

        [HttpDelete("cart/{cartId:int}")]
        public async Task<IActionResult> RemoveFromCart(int cartId)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.RemoveFromCart(token, cartId);
            return res.ToResponse(r => r.ToHttpStatus());
        }

        [HttpGet("displayDashboard")]
        public async Task<IActionResult> isAdmin()
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token) || token is null)
            {
                return Unauthorized();
            }
            var res = await users.GetRole(token);
            return Ok(res == Models.Roles.admin);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token))
                return Unauthorized();
            if (await users.GetRole(token!) != Models.Roles.admin)
                return StatusCode(403);

            return Ok(await users.GetUsers());
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUsers(string email)
        {
            logger.LogInformation($"{Request.Method}: {Request.Path}");
            if (!Request.Cookies.TryGetValue("token", out string? token))
                return Unauthorized();
            if (await users.GetRole(token!) != Models.Roles.admin)
                return StatusCode(403);
            return Ok(await users.SearchUsers(email));

        }
    }
}
