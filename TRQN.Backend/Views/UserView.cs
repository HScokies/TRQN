using TRQN.Backend.Models;

namespace TRQN.Backend.Views
{
    public record UserView
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
    }

    public record ProfileView
    {
        public string email { get; set; } = null!;
        public string fullName { get; set; } = null!;
        public string street { get; set; } = null!;
        public string apartment { get; set; } = null!;
        public string city { get; set; } = null!;
        public string zip { get; set; } = null!;
        public Country country { get; set; } = null!;
        public string telephone { get; set; } = null!;
        public string image { get; set; } = null!;
    }
}
