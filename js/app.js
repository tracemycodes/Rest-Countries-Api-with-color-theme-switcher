const customSelectDiv = document.querySelector('.custom-select'),
  selectEl = document.querySelector('select'),
  UIsearch = document.querySelector('#searchInput'),
  UIform = document.querySelector('form'),
  UIdisplay = document.querySelector('.countries-display');

const countryApi = new RestApi();
const customUISelect = new CustomSelectUI(customSelectDiv, selectEl);


document.addEventListener('DOMContentLoaded', loadAllCountries)
// document.addEventListener('keyUp', displaySinglecountry)

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
    let countryName = country.querySelector('.Region').outerText;
    let regionName = countryName.split(' ')[1];

    country.style.display = 'block';

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
    let countryName = country.querySelector('.country').outerText;

    country.style.display = 'block';

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
