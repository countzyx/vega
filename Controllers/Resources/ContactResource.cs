using System.ComponentModel.DataAnnotations;

namespace vega11.Controllers.Resources {
    public class ContactResource {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(254)]
        public string Email { get; set; }
        [Required]
        [StringLength(32)]
        public string Phone { get; set; }
    }
}