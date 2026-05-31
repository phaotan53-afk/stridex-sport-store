namespace StridexApi.Models
{
    public class SanPham
    {
        public int Id { get; set; }

        public string Ten { get; set; } = "";

        public string Loai { get; set; } = "";

        public decimal Gia { get; set; }

        public string Hinh { get; set; } = "";

        public string Mota { get; set; } = "";

        public bool NoiBat { get; set; }
    }
}