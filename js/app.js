const customSelectDiv = document.querySelector('.custom-select'),
  selectEl = document.querySelector('select'),
  UIsearch = document.querySelector('#searchInput'),
  UIform = document.querySelector('form'),
  UIdisplay = document.querySelector('.countries-display');

const countryApi = new RestApi();
const customUISelect = new CustomSelectUI(customSelectDiv, selectEl);


document.addEventListener('DOMContentLoaded', loadAllCountries)

function loadAllCountries() {
  countryApi.getAllCountries().then((data) => {
  data.forEach((country) => {
    const allCountries = document.createElement('article');
    allCountries.innerHTML = `
            <div class="flag">
              <img src=${country.flag} alt="">
            </div>
            <h2 class="country">${country.name}</h2>
            <p class="population">
              <strong>population:</strong> ${country.population}
            </p>
            <p class="Region">
              <strong>Region:</strong> ${country.region}
            </p>
            <p class="Capital">
              <strong>Capital:</strong> ${country.capital}
            </p>
      `;
      singleCountryDetails(allCountries, country)
    UIdisplay.appendChild(allCountries);
  });
});
}

// created the UI for the all options and the selected option to interact with the HTML custom select
let UIselectedOption = document.createElement('div'),
  UIselectItems = document.createElement('div');

customUISelect.appendSelectedDiv(UIselectedOption);
customUISelect.appendSelectOptions(UIselectItems);

for (let i = 1; i < selectEl.length; i++) {
  // i created div element for each select option
  let selectOptions = document.createElement('div');
  selectOptions.innerHTML = selectEl.options[i].innerHTML;

  // adding an event listener to  each select option
  selectOptions.addEventListener('click', function (e) {
    e.preventDefault();
    displayRegion(e.target.textContent);
    customUISelect.clickSelected(e);
  });

  // adding each option to the select items div
  customUISelect.UIselectItems.appendChild(selectOptions);
}
customUISelect.customDiv.appendChild(customUISelect.UIselectItems);

// Fuction for select dropdown
UIselectedOption.addEventListener('click', function (e) {
  e.stopPropagation();
  customUISelect.closeAllSelect(this);
  this.nextSibling.classList.toggle('select-hide');
  this.classList.toggle('select-arrow-active');
});



const displayRegion = (region) => {
  // loadAllCountries()
  let countriesArr = [...UIdisplay.children];

  countriesArr.forEach((country) => {
    country.style.display = 'block';
    let countryName = country.querySelector('.Region').outerText;
    let regionName = countryName.split(' ')[1];


    if (regionName.toLowerCase().includes(region.toLowerCase())) {
      country.style.display = 'block';
    } else {
      country.style.display = 'none';
    }
  });
};


UIsearch.addEventListener('keyup',  (e) => {
  let countriesArr = [...UIdisplay.children];

  countriesArr.forEach((country) => {
    country.style.display = 'block';
    let countryName = country.querySelector('.country').outerText;


    if (countryName.toLowerCase().includes(e.target.value.toLowerCase())) {
      country.style.display = 'block';
    } else {
      country.style.display = 'none';
    }
  });
})

UIform.addEventListener('submit', (e) => {
  e.preventDefault();

  countryApi
    .getSingleCountry(UIsearch.value)
    .then((data) => {
      if (data[0] != undefined) {
        UIdisplay.innerHTML = `
        <article style="max-width: 25rem; width: 100%; margin: auto;">
            <div class="flag">
              <img src=${data[0].flag} alt="">
            </div>
            <h2 class="country">${data[0].name}</h2>
            <p class="population">
              <strong>population:</strong> ${data[0].population}
            </p>
            <p class="Region">
              <strong>Region:</strong> ${data[0].region}
            </p>
            <p class="Capital">
              <strong>Capital:</strong> ${data[0].capital}
            </p>
          </article>
      `;
      } else {
        alert('enter a valid country name');
      }
    })
    .catch((err) => console.log(err));
});


function singleCountryDetails(currentCountry, country) {
  const mainSection = document.querySelector('.container')
  const headerSection = document.querySelector('header')
  // console.log(currentCountry, country);
  let singleCountryPage = document.createElement('section')
  singleCountryPage.className = "single-country-display"

  currentCountry.addEventListener('click', (e) => {
    let countriesArr = [...UIdisplay.children];
    countriesArr.forEach(presentCountry => {
      presentCountry.style.display = 'none'
    })
    e.preventDefault()
    // document.createElement()
    console.log(country);
    singleCountryPage.style.display = "block"
    singleCountryPage.innerHTML = `
      <button class="home-page">Back</button>
        <div gd-2>
          <article class="single-country-flag">
            <div class="single-flag">
              <img src=${country.flag} alt="">
            </div>
          </article>
          <article class="single-country-details">
            <h2 class="country single-name">${country.name}</h2>
            <div class="fl-left">
              <p class="native-name">
                <strong>Native Name:</strong> ${country.nativeName}
              </p>
              <p class="single-population">
                <strong>population:</strong> ${country.population}
              </p>
              <p class="single-region">
                <strong>Region:</strong> ${country.region}
              </p>
              <p class="sub-region">
                <strong>Region:</strong> ${country.subregion}
              </p>
              <p class="single-capital">
                <strong>Capital:</strong> ${country.capital}
              </p>
            </div>
            <div class="fl-right">
              <p class="single-domain">
                <strong>Top Level Domain:</strong> ${country.topLevelDomain[0]}
              </p>
              <p class="single-currencies">
                <strong>Currencies:</strong> ${country.currencies.map(currency => currency.name)}
              </p>
              <p class="single-languages">
                <strong>Languages:</strong> ${country.languages.map(language => language.name)}
              </p>
            </div>
            <div class="fl-down">
              <p>Border Countries</p>
              <div>
                <span>France</span>
                <span>German</span>
                <span>Netherlands</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    `
    let homeBtn = singleCountryPage.querySelector('.home-page')
    closeBtn(homeBtn, singleCountryPage)
  })
  mainSection.insertBefore(singleCountryPage, headerSection)
}



function closeBtn(backBtn, presentPage) {
  backBtn.addEventListener('click', (e) => {
  e.preventDefault()

  presentPage.style.display = 'none'

  let countriesArr = [...UIdisplay.children];
    countriesArr.forEach(presentCountry => {
      presentCountry.style.display = 'block'
    })

})
}

