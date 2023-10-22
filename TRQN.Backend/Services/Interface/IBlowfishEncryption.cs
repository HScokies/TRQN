namespace TRQN.Backend.Services.Interface
{
    public interface IBlowfishEncryption
    {
        public String Encrypt(String data);
        public String Decrypt(String data);
    }
}
