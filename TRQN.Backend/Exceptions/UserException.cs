namespace TRQN.Backend.Exceptions
{
    public class UserException : ACustomException
    {
        public override int code { get; set; }
        public override string message { get; set; }
        public UserException(int code = StatusCodes.Status404NotFound, string message = "Specified user cannot be found")
        {
            this.code = code; this.message = message;
        }
    }
}
