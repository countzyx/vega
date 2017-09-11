using System.Linq;

namespace vega11.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsSupportedFileExtension(string fileExtension) {
            return AcceptedFileTypes.Any(s => s == fileExtension);
        }
    }
}