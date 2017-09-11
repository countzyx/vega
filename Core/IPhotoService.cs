using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega11.Core.Models;

namespace vega11.Core {
    public interface IPhotoService {
        Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}