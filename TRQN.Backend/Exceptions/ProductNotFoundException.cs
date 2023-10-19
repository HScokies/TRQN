namespace TRQN.Backend.Exceptions
{
    public class ProductNotFoundException : ACustomException
    {

        public override int code { get; set; }
        public override string message { get; set; }

        public ProductNotFoundException(string message = "Specified product cannot be found")
        {
            this.code = StatusCodes.Status404NotFound;
            this.message = message;
        }
    }
}
