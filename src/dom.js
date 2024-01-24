import searchIconSrc from './search.svg';
import { publish } from './pubsub';

const degreeSymbol = '\u00B0';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let backgroundElement = null;
let locationElement = null;
let countryElement = null;
let temperatureElement = null;
let conditionElement = null;
let errorElement = null;

function getTemperatureStringC(temperatureC) {
  return `${temperatureC}${degreeSymbol}C`;
}

function getTemperatureStringF(temperatureF) {
  return `${temperatureF}${degreeSymbol}F`;
}

function fadeAndUpdateInnerText(
  element,
  fadeSeconds,
  targetOpacity,
  newInnerText,
) {
  /* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
  // Need named function so can removeEventListener once transition is done
  function onTransitionEnd() {
    element.innerText = newInnerText;
    element.style.opacity = targetOpacity;
    element.removeEventListener('transitionend', onTransitionEnd);
  }
  element.style.transition = `opacity ${fadeSeconds}s`;
  // eslint-disable-next-line eqeqeq -- does not perform expected comparison with strict equality or using '0'
  if (element.style.opacity == 0) {
    element.innerText = newInnerText;
    element.style.opacity = targetOpacity;
  } else if (element.innerText !== newInnerText) {
    element.style.opacity = 0;
    element.addEventListener('transitionend', onTransitionEnd);
  }
  /* eslint-enable no-param-reassign */
}

function displayWeatherDataFetchError(error) {
  fadeAndUpdateInnerText(errorElement, 0.3, 1, error.message);
}

function clearWeatherDataFetchError() {
  fadeAndUpdateInnerText(errorElement, 0.3, 1, '');
}

function createSearchBar() {
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');

  errorElement = document.createElement('div');
  errorElement.innerText = 'Error message';
  errorElement.classList.add('error-display', 'transparent');
  searchContainer.appendChild(errorElement);

  const searchBar = document.createElement('div');
  searchBar.classList.add('search-bar');
  searchContainer.appendChild(searchBar);

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
    else displayWeatherDataFetchError(new Error('Please enter a location'));
  });
  searchBar.appendChild(searchButton);

  return searchContainer;
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
    clearWeatherDataFetchError();
    locationElement.innerText = weatherObject.location;
    countryElement.innerText = weatherObject.country;
    temperatureElement.innerText = getTemperatureStringC(weatherObject.temp_c);
    conditionElement.innerText = weatherObject.condition;
  } catch (error) {
    console.log(error);
    displayWeatherDataFetchError(new Error('Data display error'));
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

export {
  createWeatherDisplay,
  updateWeatherDisplay,
  displayWeatherDataFetchError,
};
