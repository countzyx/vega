using AutoMapper;
using vega11.Controllers.Resources;
using vega11.Models;

namespace vega11.Mapping {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
        }
    }
}