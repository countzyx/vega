using Microsoft.EntityFrameworkCore;
using vega11.Core.Models;

namespace vega11.Persistence {
    public class VegaDbContext : DbContext {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options) {
        }

        public DbSet<Feature> Features { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}