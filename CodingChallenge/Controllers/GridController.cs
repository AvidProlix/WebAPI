using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CodingChallenge.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodingChallenge.Controllers
{
    [Route("api/grid")]
    [ApiController]
    public class GridController : ControllerBase
    {
        private readonly TriangleContext _context;

        public GridController(TriangleContext context)
        {
            _context = context;
        }

        // GET: api/Grid
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TriangleItem>>> GetTriangleItems()
        {
            return await _context.TriangleItems.ToListAsync();
        }

        // GET: api/Grid/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TriangleItem>> GetTriangleItem(long id)
        {
            var triangleItem = await _context.TriangleItems.FindAsync(id);

            if (triangleItem == null)
            {
                return NotFound();
            }

            return triangleItem;
        }

        // POST: api/Grid
        [HttpPost]
        public async Task<ActionResult<TriangleItem>> PostTriangleItem(TriangleItem item)
        {
            //compute verticies or grid value before adding to db
            if (item.VertexDefined())
            {
                item.FindGridCoords();
            }
            else if (item.GridDefined())
            {
                item.FindVertices();
            }
            _context.TriangleItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTriangleItem), new { id = item.Id }, item);
        }

        // PUT: api/Grid/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTriangleItem(long id, TriangleItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Grid/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTriangleItem(long id)
        {
            var triangleItem = await _context.TriangleItems.FindAsync(id);

            if (triangleItem == null)
            {
                return NotFound();
            }

            _context.TriangleItems.Remove(triangleItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
