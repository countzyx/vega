using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega11.Controllers.Resources;
using vega11.Core;
using vega11.Core.Models;

namespace vega11.Controllers {
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepo;
        private readonly IUnitOfWork unitOfWork;
        private readonly PhotoSettings PhotoSettings;
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepo;
        private readonly IPhotoService photoService;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepo,
            IPhotoRepository photoRepository, IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options, IPhotoService photoService) {
            this.photoService = photoService;
            this.photoRepo = photoRepository;
            this.PhotoSettings = options.Value;
            this.mapper = mapper;
            this.host = host;
            this.vehicleRepo = vehicleRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId) {
            var photos = await photoRepo.GetPhotos(vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file) {
            var vehicle = await vehicleRepo.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null)
                return BadRequest("No file was uploaded");

            if (file.Length == 0)
                return BadRequest("Empty file");

            if (file.Length > PhotoSettings.MaxBytes)
                return BadRequest("File too large");

            var fileExt = Path.GetExtension(file.FileName).ToLower();
            if (!PhotoSettings.IsSupportedFileExtension(fileExt))
                return BadRequest("File must be only of accepted types - "
                    + String.Join(", ", PhotoSettings.AcceptedFileTypes));

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo = await photoService.UploadPhoto(vehicle, file, uploadsFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}