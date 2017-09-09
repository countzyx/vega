using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega11.Core;
using vega11.Core.Models;

namespace vega11.Persistence {
    public class VehicleRepository: IVehicleRepository {
        private readonly VegaDbContext context;


        public VehicleRepository(VegaDbContext context) {
            this.context = context;
        }


        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true) {
            if (includeRelated) {
                return await context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
            } else {
                return await context.Vehicles.FindAsync(id);
            }
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj) {
            var query = context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .AsQueryable();

            if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            return await query.ToListAsync();
        }


        public void Add(Vehicle vehicle) {
            context.Vehicles.Add(vehicle);
        }


        public void Remove(Vehicle vehicle) {
            context.Vehicles.Remove(vehicle);
        }
    }
}