using ProgKnow.Models;

namespace ProgKnow.Context
{
    public interface IReportContext
    {
        Task<bool> ReportAsync(string id);
    }
}