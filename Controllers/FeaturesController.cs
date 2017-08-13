using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega11.Controllers.Resources;
using vega11.Models;
using vega11.Persistence;

namespace vega11.Controllers {
    public class FeaturesController : Controller {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(VegaDbContext context, IMapper mapper) {
            this.mapper = mapper;
            this.context = context;
        }


        [HttpGet("/api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures() {
            var features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>, List<FeatureResource>>(features);
        }
    }
}