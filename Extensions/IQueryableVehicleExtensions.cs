using System.Linq;
using vega11.Core.Models;

namespace vega11.Extensions {
    public static class IQueryableVehicleExtensions {
        public static IQueryable<Vehicle> ApplyFiltering(this IQueryable<Vehicle> query, VehicleQuery queryObj) {
            if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            return query;
        }
    }
}