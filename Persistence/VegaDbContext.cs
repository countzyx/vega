using Microsoft.EntityFrameworkCore;
using vega11.Models;

namespace vega11.Persistence {
    public class VegaDbContext : DbContext {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options) {
        }

        public DbSet<Make> Makes { get; set; }


        public DbSet<Feature> Features { get; set; }
    }
}