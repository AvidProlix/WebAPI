using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CodingChallenge.Models
{
    public class TriangleContext : DbContext
    {
        public TriangleContext(DbContextOptions<TriangleContext> options)
            : base(options)
        {
        }

        public DbSet<TriangleItem> TriangleItems { get; set; }
    }
}
