namespace TRQN.Backend.Models
{
    public record Category
    {
        public int id { get; set; }
        public string name { get; set; } = null!;
    }
}
