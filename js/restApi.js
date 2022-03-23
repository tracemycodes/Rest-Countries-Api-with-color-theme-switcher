class RestApi {
  constructor() {

  }
  async getAllCountries() {
    const countryResponse = await fetch('https://restcountries.com/v2/all'),

          countryData = await countryResponse.json();

    return countryData;
  }
}