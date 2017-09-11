using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace vega11.Core {
    public interface IPhotoStorage {
        Task<string> StorePhoto(string targetLocation, IFormFile file);
    }
}