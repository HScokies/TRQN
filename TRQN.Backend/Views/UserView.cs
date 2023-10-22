namespace TRQN.Backend.Views
{
    public record UserView
    {
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
    }
}
