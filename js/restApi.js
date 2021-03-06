class RestApi {
  constructor(countryName, region) {
    this.name = countryName,
    this.region = region
  }
  async getAllCountries() {
    const countryResponse = await fetch('https://restcountries.com/v2/all'),

          countryData = await countryResponse.json();

    return countryData;
  }

  async getSingleCountry(country) {
    const countryResponse = await fetch(`https://restcountries.com/v2/name/${country}`),

          countryData = await countryResponse.json();

    return countryData
  }
}