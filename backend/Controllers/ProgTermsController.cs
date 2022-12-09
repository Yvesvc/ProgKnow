using Microsoft.AspNetCore.Mvc;
using ProgKnow.Context;
using ProgKnow.Models;

namespace ProgKnow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgTermsController : ControllerBase
    {
        private readonly IProgTermContext _progTermContext;

        public ProgTermsController(IProgTermContext progTermContext)
        {
            _progTermContext = progTermContext;
        }

        [HttpGet("Random")]
        public async Task<ProgTerm> GetRandomProgTerm()
        {
            return await _progTermContext.GetRandomAsync();
        }

        [HttpGet("Next")]
        public async Task<ProgTerm> GetNextProgTerm(string id)
        {
            return await _progTermContext.GetNextAsync(id);
        }

        [HttpGet("Previous")]
        public async Task<ProgTerm> GetPreviousProgTerm(string id)
        {
            return await _progTermContext.GetPreviousAsync(id);
        }

        [HttpGet("Search")]
        public async Task<IEnumerable<ProgTerm>> GetProgTermsBySearch(string q)
        {
            return await _progTermContext.GetBySearchAsync(q);
        }

        [HttpGet("{id}")]
        public async Task<ProgTerm> GetProgTermById(string id)
        {
            return await _progTermContext.GetByIdAsync(id);
        }

    }
}
