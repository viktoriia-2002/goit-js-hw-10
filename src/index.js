import './css/styles.css';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function clearCountryList() {
  refs.countryListEl.innerHTML = '';
}

function clearCountryInfo() {
    refs.countryInfoEl.innerHTML = '';
  }
  

function onInput(event) {
  event.preventDefault();

  const country = event.target.value.trim();

  if (!country) {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  API.fetchCountries(country)
    .then(countries => {
      if (countries.length === 1) {
        renderCountryInfo(countries[0]);
      } else if (countries.length > 1 && countries.length <= 10) {
        renderCountriesList(countries);
      } else {
        clearCountryList();
        clearCountryInfo();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      clearCountryList();
      clearCountryInfo();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(country) {
  clearCountryList();
  const countryInfoMarkup = `
<li>
<img src="${country.flag}" alt="${country.name}" width="500">
<h2 class="country_title">${country.name.official}</h2>
<p class="country_capital"><span>Capital:</span> ${country.capital}</p>
<p class="country_population"><span>Population:</span> ${country.population}</p>
<p class="country_lang"><span>Languages:</span> ${country.languages
    .map(lang => lang.name)
    .join(' ')}</p>

</li>`;
  refs.countryInfoEl.innerHTML = countryInfoMarkup;
}

