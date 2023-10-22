using System.Text;
using TRQN.Backend.Services.Interface;

namespace TRQN.Backend.Services.Encryption
{

    public class BlowfishEncryption : IBlowfishEncryption
    {
        const int N = 16;
        const int KEYBYTES = 8;

        uint[] P;
        uint[,] S;

        private BlowfishEncryption(byte[] key)
        {
            short i;
            short j;
            short k;
            uint data;
            uint datal;
            uint datar;

            P = (uint[])Boxes.P.Clone();
            S = (uint[,])Boxes.S.Clone();

            j = 0;
            for (i = 0; i < N + 2; ++i)
            {
                data = 0x00000000;
                for (k = 0; k < 4; ++k)
                {
                    data = (data << 8) | key[j];
                    j++;
                    if (j >= key.Length)
                    {
                        j = 0;
                    }
                }
                P[i] = P[i] ^ data;
            }

            datal = 0x00000000;
            datar = 0x00000000;

            for (i = 0; i < N + 2; i += 2)
            {
                Encrypt(ref datal, ref datar);
                P[i] = datal;
                P[i + 1] = datar;
            }

            for (i = 0; i < 4; ++i)
            {
                for (j = 0; j < 256; j += 2)
                {
                    Encrypt(ref datal, ref datar);

                    S[i, j] = datal;
                    S[i, j + 1] = datar;
                }
            }
        }
        
        public BlowfishEncryption(string key) : this(Encoding.Unicode.GetBytes(key))
        {

        }


        private uint F(uint x)
        {
            ushort a;
            ushort b;
            ushort c;
            ushort d;
            uint y;

            d = (ushort)(x & 0x00FF);
            x >>= 8;
            c = (ushort)(x & 0x00FF);
            x >>= 8;
            b = (ushort)(x & 0x00FF);
            x >>= 8;
            a = (ushort)(x & 0x00FF);
            //y = ((S[0][a] + S[1][b]) ^ S[2][c]) + S[3][d];
            y = S[0, a] + S[1, b];
            y = y ^ S[2, c];
            y = y + S[3, d];

            return y;
        }

        private void Encrypt(byte[] data, int length)
        {
            uint xl, xr;
            if ((length % 8) != 0)
                throw new Exception("Invalid Length");
            
            for (int i = 0; i < length; i += 8)
            {
                // Encode the data in 8 byte blocks.
                xl = (uint)((data[i] << 24) | (data[i + 1] << 16) | (data[i + 2] << 8) | data[i + 3]);
                xr = (uint)((data[i + 4] << 24) | (data[i + 5] << 16) | (data[i + 6] << 8) | data[i + 7]);
                Encrypt(ref xl, ref xr);
                // Now Replace the data.
                data[i] = (byte)(xl >> 24);
                data[i + 1] = (byte)(xl >> 16);
                data[i + 2] = (byte)(xl >> 8);
                data[i + 3] = (byte)(xl);
                data[i + 4] = (byte)(xr >> 24);
                data[i + 5] = (byte)(xr >> 16);
                data[i + 6] = (byte)(xr >> 8);
                data[i + 7] = (byte)(xr);
            }
        }

        private void Encrypt(ref uint xl, ref uint xr)
        {
            uint Xl;
            uint Xr;
            uint temp;
            short i;

            Xl = xl;
            Xr = xr;

            for (i = 0; i < N; ++i)
            {
                Xl = Xl ^ P[i];
                Xr = F(Xl) ^ Xr;

                temp = Xl;
                Xl = Xr;
                Xr = temp;
            }

            temp = Xl;
            Xl = Xr;
            Xr = temp;

            Xr = Xr ^ P[N];
            Xl = Xl ^ P[N + 1];

            xl = Xl;
            xr = Xr;
        }


        public String Encrypt(String data)
        {
            byte[] b = Encoding.Unicode.GetBytes(data);
            List<byte> nb = new List<byte>();
            foreach (var by in b) nb.Add(by);
            while (nb.Count % 8 != 0)
                nb.Add(0);

            Encrypt(nb.ToArray(), nb.Count);

            return Convert.ToBase64String(b);
        }


        private void Decrypt(byte[] data, int length)
        {
            uint xl, xr;
            if ((length % 8) != 0)
                throw new Exception("Invalid Length");
            for (int i = 0; i < length; i += 8)
            {
                // Encode the data in 8 byte blocks.
                xl = (uint)((data[i] << 24) | (data[i + 1] << 16) | (data[i + 2] << 8) | data[i + 3]);
                xr = (uint)((data[i + 4] << 24) | (data[i + 5] << 16) | (data[i + 6] << 8) | data[i + 7]);
                Decrypt(ref xl, ref xr);
                // Now Replace the data.
                data[i] = (byte)(xl >> 24);
                data[i + 1] = (byte)(xl >> 16);
                data[i + 2] = (byte)(xl >> 8);
                data[i + 3] = (byte)(xl);
                data[i + 4] = (byte)(xr >> 24);
                data[i + 5] = (byte)(xr >> 16);
                data[i + 6] = (byte)(xr >> 8);
                data[i + 7] = (byte)(xr);
            }
        }

        private void Decrypt(ref uint xl, ref uint xr)
        {
            uint Xl;
            uint Xr;
            uint temp;
            short i;

            Xl = xl;
            Xr = xr;

            for (i = N + 1; i > 1; --i)
            {
                Xl = Xl ^ P[i];
                Xr = F(Xl) ^ Xr;

                /* Exchange Xl and Xr */
                temp = Xl;
                Xl = Xr;
                Xr = temp;
            }

            /* Exchange Xl and Xr */
            temp = Xl;
            Xl = Xr;
            Xr = temp;

            Xr = Xr ^ P[1];
            Xl = Xl ^ P[0];

            xl = Xl;
            xr = Xr;
        }


        public String Decrypt(String data)
        {
            byte[] b = Convert.FromBase64String(data);
            List<byte> nb = new List<byte>();
            foreach (var by in b) nb.Add(by);
            while (nb.Count % 8 != 0)
                nb.Add(0);
            Decrypt(nb.ToArray(), nb.Count);
            //Decipher(b, b.Length);

            return Encoding.Unicode.GetString(b);
        }
    }
}
