namespace TRQN.Backend.Views
{
    public record CountryView
    {
        public decimal tax { get; set; }
        public decimal shipping { get; set; }
    }
    public record CountryPreview
    {
        public int id { get; set; }
        public string name { get; set; } = null!;
    }
}
