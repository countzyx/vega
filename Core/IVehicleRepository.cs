using System.Threading.Tasks;
using vega11.Core.Models;

namespace vega11.Core {
    public interface IVehicleRepository {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}