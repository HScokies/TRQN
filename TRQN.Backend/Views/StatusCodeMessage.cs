namespace TRQN.Backend.Views
{
    public record StatusCodeMessage
    {
        public int code { get; set; }
        public string message { get; set; } = null!;
    }
}
