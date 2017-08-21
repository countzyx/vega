using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega11.Controllers.Resources;
using vega11.Core.Models;
using vega11.Persistence;

namespace vega11.Controllers {
    public class MakesController : Controller {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public MakesController(VegaDbContext context, IMapper mapper) {
            this.mapper = mapper;
            this.context = context;

        }


        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes() {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}