// const BASE_URL = `https://restcountries.com/v3.1`;

// function fetchCountries(country) {
//   return fetch(
//     `${BASE_URL}/name/${country}?fields=name,population,capital,flags,languages`
//   ).then(response => response.json());
// }

// export default { fetchCountries };
const BASE_URL = `https://restcountries.com/v3.1`;

function fetchCountries(country) {
  return fetch(
    `${BASE_URL}/?fields=name,population,capital,flags,languages`
  ).then(response => response.json());
}

export default { fetchCountries };
