using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace TRQN.Backend.Models
{
    public record User
    {
        public int id { get; set; }
        public Guid token { get; set; }
        [EmailAddress]
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
        public Roles role { get; set; } = Roles.user;

        public string? fullName { get; set; } = null!;
        public string? street { get; set; } = null!;
        public string? apartment { get; set; } = null!;
        public string? city { get; set; } = null!;
        public string? zip { get; set; } = null!;
        public string avatar { get; set;} = "defaultavatar.jpg";
        public string? telephone { get; set; } = null!;
        public int? countryId { get; set; }
        public Country country { get; set; } = null!;

    }

    public record UserDataInput
    {
        [AllowNull]
        public IFormFile? image { get; set; } = null!;
        public string fullName { get; set; } = null!;
        public string street { get; set; } = null!;
        public string apartment { get; set; } = null!;
        public string city { get; set; } = null!;
        public string zip { get; set; } = null!;
        public string telephone { get; set; } = null!;
        public int countryId { get; set; }
    }

    public record Cart
    {
        public int id { get; set; }
        public int userId { get; set; }
        public User user { get; set; } = null!;
        public int sizeId { get; set; } // bc size links to product
        public Size size { get; set; } = null!;
    }

    public enum Roles
    {
        user,
        admin
    }
}
