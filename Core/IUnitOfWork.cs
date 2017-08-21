using System.Threading.Tasks;

namespace vega11.Core {
    public interface IUnitOfWork {
        Task CompleteAsync();
    }
}