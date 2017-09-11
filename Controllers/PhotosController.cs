using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vega11.Controllers.Resources;
using vega11.Core;
using vega11.Core.Models;

namespace vega11.Controllers {
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private const int MAX_BYTES = 10 * (1024 ^ 2);
        private static readonly string[] ACCEPTED_FILE_TYPES = new[] { ".gif", ".jpeg", ".jpg", ".png" };

        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper) {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.host = host;
            this.repository = repository;
        }


        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file) {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null)
                return BadRequest("No file was uploaded");

            if (file.Length == 0)
                return BadRequest("Empty file");

            if (file.Length > MAX_BYTES)
                return BadRequest("File too large");
            
            var fileExt = Path.GetExtension(file.FileName);
            if (!ACCEPTED_FILE_TYPES.Any(s => s == fileExt))
                return BadRequest("File must be only of accepted types - " + String.Join(", ", ACCEPTED_FILE_TYPES));

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}