using LanguageExt.Common;
using Microsoft.EntityFrameworkCore;
using TRQN.Backend.Data;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Mappers;
using TRQN.Backend.Services.Interface;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services
{
    public class CountriesRepos : ICountriesRepos
    {
        private readonly AppDbContext ctx;

        public CountriesRepos(AppDbContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<IEnumerable<CountryPreview>> GetCountries()
        {
            var res = await ctx.countries.ToListAsync();
            return res.ToCountryPreview();
        }

        public async Task<Result<CountryView>> GetCountryData(int countryId)
        {
            var res = await ctx.countries.FirstOrDefaultAsync(c => c.id == countryId);
            if (res is null)
            {
                var ex = new CountryException();
                return new Result<CountryView>(ex);
            }
            return new Result<CountryView>(res.ToCountryView());
        }
    }
}
