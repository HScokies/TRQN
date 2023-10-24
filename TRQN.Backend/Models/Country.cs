namespace TRQN.Backend.Models
{
    public record Country
    {
        public int id {  get; set; }
        public string name { get; set; } = null!;
        public decimal tax { get; set; }
        public decimal shipping { get; set; }
    }
}
