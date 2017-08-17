using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using vega11.Controllers.Resources;
using vega11.Models;

namespace vega11.Mapping {
    public class MappingProfile : Profile {
        public MappingProfile() {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName,
                    Email = v.ContactEmail,
                    Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)))
            ;

            // API Resource to Domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore()) // Features need AfterMap processing, so ignore right now.
                .AfterMap((vr, v) => {
                    // Remove unselected features.                    
                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);
                    
                    // Add new features.
                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id))
                        .Select(id => new VehicleFeature { FeatureId = id });
                    foreach (var f in addedFeatures)
                        v.Features.Add(f);
                })
            ;
        }
    }
}