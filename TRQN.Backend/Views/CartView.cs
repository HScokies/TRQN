namespace TRQN.Backend.Views
{
    public record CartView
    {
        public  decimal subtotal { get; set; }
        public IEnumerable<CartItem> items { get; set; } = null!;
    }

    public record CartItem
    {
        public int id { get; set; }
        public string title { get; set; } = null!;
        public double size { get; set; }
        public string colorWay { get; set; } = null!;
        public string image { get; set; } = null!;
        public decimal price { get; set; }
    }
}
