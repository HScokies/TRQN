using Microsoft.AspNetCore.Mvc;
using TRQN.Backend.Controllers.Extentions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Services.Interface;

namespace TRQN.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : Controller
    {
        private readonly ICountriesRepos countries;
        private readonly ILogger<CountriesController> logger;

        public CountriesController(ICountriesRepos countries, ILogger<CountriesController> logger)
        {
            this.countries = countries;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var res = await countries.GetCountries();
            return Ok(res);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCountry(int id)
        {
            var res = await countries.GetCountryData(id);
            return res.ToResponse(r => r.ToHttpStatus());
        }
    }
}
