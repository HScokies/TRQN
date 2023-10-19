using System.ComponentModel.DataAnnotations;
using TRQN.Backend.Models;

namespace TRQN.Backend.Views
{
    public record ProductInfo
    {
        public string SKU { get; set; } = null!;
        public string name { get; set; } = null!;
        public string description { get; set; } = null!;
        public string image { get; set; } = null!; 
        public string colorway { get; set; } = null!;
        [DataType(DataType.Date)]
        public DateOnly releaseDate { get; set; }
        public List<Size> sizes { get; set; } = new();
    }
}
