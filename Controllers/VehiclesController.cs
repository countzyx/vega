using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega11.Controllers.Resources;
using vega11.Models;
using vega11.Persistence;

namespace vega11.Controllers {
    [Route("/api/vehicles")]
    public class VehiclesController : Controller {
        private readonly IMapper mapper;
        private readonly VegaDbContext context;
        public VehiclesController(IMapper mapper, VegaDbContext context) {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var model = await context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null) {
                ModelState.AddModelError("ModelId", "Invalid ModelId.");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;
            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
    }
}