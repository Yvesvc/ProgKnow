using ProgKnow.Models;

namespace ProgKnow.Context
{
    public interface IProgTermContext
    {
        Task<ProgTerm> GetByIdAsync(string id);
        Task<IEnumerable<ProgTerm>> GetBySearchAsync(string q);
        Task<ProgTerm> GetNextAsync(string id);
        Task<ProgTerm> GetPreviousAsync(string id);
        Task<ProgTerm> GetRandomAsync();
    }
}