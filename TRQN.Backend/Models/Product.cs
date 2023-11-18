using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace TRQN.Backend.Models
{
    public record Product
    {
        [Key]
        public string SKU { get; set; } = null!;
        public Category category { get; set; } = null!;
        public string name { get; set; } = null!;
        public string description { get; set; } = null!;
        public string image { get; set; } = null!; // Filename
        public string colorway { get; set; } = null!;
        [DataType(DataType.Date)]
        public DateOnly releaseDate { get; set; }
        public List<Size> sizes { get; set; } = new();
    }

    public record Size
    {
        public int id { get; set; }
        [NotNull]
        public string productId { get; set; } = null!;
        public Product product { get; set; } = null!;
        public double size { get; set; }
        [DataType(DataType.Currency)]
        public decimal price { get; set; }
    }
}
