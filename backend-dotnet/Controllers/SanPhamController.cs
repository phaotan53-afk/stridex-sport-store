using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StridexApi.Data;
using StridexApi.Models;

namespace StridexApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SanPhamController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SanPhamController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SanPham>>> LayTatCa()
        {
            return await _context.SanPhams.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SanPham>> LayTheoId(int id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);

            if (sanPham == null)
            {
                return NotFound();
            }

            return sanPham;
        }
        [HttpGet("noi-bat")]
        public async Task<ActionResult<List<SanPham>>> LaySanPhamNoiBat()
        {
            var danhSach = await _context.SanPhams
                .Where(sp => sp.NoiBat == true)
                .ToListAsync();

            return Ok(danhSach);
        }
    }
}