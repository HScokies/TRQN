using LanguageExt.Common;
using TRQN.Backend.Views;

namespace TRQN.Backend.Services.Interface
{
    public interface ICountriesRepos
    {
        public Task<IEnumerable<CountryPreview>> GetCountries();
        public Task<Result<CountryView>> GetCountryData(int countryId);
    }
}
