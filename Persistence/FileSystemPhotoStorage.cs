using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega11.Core;

namespace vega11.Persistence {
    public class FileSystemPhotoStorage : IPhotoStorage {
        public async Task<string> StorePhoto(string targetLocation, IFormFile file) {
            if (!Directory.Exists(targetLocation))
                Directory.CreateDirectory(targetLocation);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(targetLocation, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}