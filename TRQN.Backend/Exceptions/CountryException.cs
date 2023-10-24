namespace TRQN.Backend.Exceptions
{
    public class CountryException : ACustomException
    {

        public override int code { get; set; }
        public override string message { get; set; }

        public CountryException(string message = "Specified country cannot be found")
        {
            this.code = StatusCodes.Status404NotFound;
            this.message = message;
        }
    }
}
