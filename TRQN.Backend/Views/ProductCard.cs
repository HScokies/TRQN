namespace TRQN.Backend.Views
{
    public record ProductCard
    {
        public string SKU { get; set; } = null!;
        public string name { get; set; } = null!;
        public string image { get; set; } = null!;
        public string descriptionShort { get; set; } = null!;
        public decimal price { get; set; }
    }
}
