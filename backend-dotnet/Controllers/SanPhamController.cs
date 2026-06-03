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
        [HttpPost]
        public async Task<ActionResult<SanPham>> ThemSanPham(SanPham sanPham)
        {
            _context.SanPhams.Add(sanPham);
            await _context.SaveChangesAsync();
            return Ok(sanPham);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> SuaSanPham(int id, SanPham sanPham)
        {
            if (id != sanPham.Id) return BadRequest();

            _context.Entry(sanPham).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(sanPham);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> XoaSanPham(int id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);

            if (sanPham == null) return NotFound();

            _context.SanPhams.Remove(sanPham);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}