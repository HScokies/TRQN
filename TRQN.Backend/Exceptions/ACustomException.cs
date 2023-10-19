namespace TRQN.Backend.Exceptions
{
    public abstract class ACustomException : Exception
    {
        abstract public int code { get; set; }
        abstract public string message { get; set; }
    }
}
