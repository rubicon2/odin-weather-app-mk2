import searchIconSrc from './search.svg';
import { publish } from './pubsub';

const degreeSymbol = '\u00B0';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let backgroundElement = null;
let locationElement = null;
let countryElement = null;
let temperatureElement = null;
let conditionElement = null;

function getTemperatureStringC(temperatureC) {
  return `${temperatureC}${degreeSymbol}C`;
}

function getTemperatureStringF(temperatureF) {
  return `${temperatureF}${degreeSymbol}F`;
}

function createSearchBar() {
  const searchBar = document.createElement('div');
  searchBar.classList.add('search-bar');

  const locationInput = document.createElement('input');
  locationInput.type = 'text';
  searchBar.appendChild(locationInput);

  const searchButton = document.createElement('div');
  searchButton.classList.add('search-button');

  const searchIcon = document.createElement('img');
  searchIcon.src = searchIconSrc;
  searchButton.appendChild(searchIcon);

  searchButton.addEventListener('click', () => {
    if (locationInput.value) publish('onLocationSubmit', locationInput.value);
  });
  searchBar.appendChild(searchButton);

  return searchBar;
}

function createInfoPanel() {
  const infoPanel = document.createElement('div');
  infoPanel.classList.add('weather-info-panel');

  locationElement = document.createElement('div');
  locationElement.classList.add('location-display');
  infoPanel.appendChild(locationElement);

  countryElement = document.createElement('div');
  countryElement.classList.add('country-display');
  infoPanel.appendChild(countryElement);

  temperatureElement = document.createElement('div');
  temperatureElement.classList.add('temperature-display');
  infoPanel.appendChild(temperatureElement);

  conditionElement = document.createElement('div');
  conditionElement.classList.add('condition-display');
  infoPanel.appendChild(conditionElement);

  infoPanel.appendChild(createSearchBar());

  return infoPanel;
}

function updateWeatherDisplay(weatherObject) {
  // In case weatherObject is null for whatever reason, or elements not set up yet
  try {
    locationElement.innerText = weatherObject.location;
    countryElement.innerText = weatherObject.country;
    temperatureElement.innerText = getTemperatureStringC(weatherObject.temp_c);
    conditionElement.innerText = weatherObject.condition;
  } catch (error) {
    console.log(error);
  }
}

function createWeatherDisplay() {
  // Contains background and info display
  const weatherDisplay = document.createElement('div');
  weatherDisplay.classList.add('weather-container');
  backgroundElement = weatherDisplay;

  // Info panel - Takes up right side of screen, transparent background, contains text info and graphics
  weatherDisplay.appendChild(createInfoPanel());

  return weatherDisplay;
}

export { createWeatherDisplay, updateWeatherDisplay };
