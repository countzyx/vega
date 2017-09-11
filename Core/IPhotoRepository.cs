using System.Collections.Generic;
using System.Threading.Tasks;
using vega11.Core.Models;

namespace vega11.Core {
    public interface IPhotoRepository {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}