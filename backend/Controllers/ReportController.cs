using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgKnow.Context;

namespace ProgKnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportContext _reportContext;

        public ReportController(IReportContext reportContext)
        {
            _reportContext = reportContext;
        }


        [HttpPost("{id}")]
        [Authorize(Policy = "MustBeAdmin")]
        public async Task<StatusCodeResult> ReportProgTerm(string id)
        {
            if((await _reportContext.ReportAsync(id)))
            {
                return Ok();
            }

            else
            {
                return new StatusCodeResult(500);
            }
            
        }
    }
}
