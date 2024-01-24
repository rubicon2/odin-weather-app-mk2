import searchIconSrc from './search.svg';
import { publish } from './pubsub';
import getImage from './weatherPhotosAPI';

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

function fadeOutAndIn(element, fadeSeconds, targetOpacity, fn) {
  /* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
  // Need named function so can use removeEventListener on it once transition is done
  function onTransitionEnd() {
    fn();
    element.style.opacity = targetOpacity;
    element.removeEventListener('transitionend', onTransitionEnd);
  }
  element.style.transition = `opacity ${fadeSeconds}s`;
  // eslint-disable-next-line eqeqeq -- does not perform expected comparison with strict equality or using '0'
  if (element.style.opacity == 0) {
    fn();
    element.style.opacity = targetOpacity;
  } else {
    element.style.opacity = 0;
    element.addEventListener('transitionend', onTransitionEnd);
  }
  /* eslint-enable no-param-reassign */
}

function fadeInnerText(element, innerText, fadeSeconds = 1, targetOpacity = 1) {
  /* eslint-disable no-param-reassign */
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.innerText = innerText;
  });
  /* eslint-enable no-param-reassign */
}

function fadeBackgroundImage(element, img, fadeSeconds = 1, targetOpacity = 1) {
  /* eslint-disable no-param-reassign */
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.style.backgroundImage = `url(${img})`;
  });
  /* eslint-enable no-param-reassign */
}

function displayWeatherDataFetchError(error) {
  if (errorElement.innerText !== error.message) {
    fadeOutAndIn(errorElement, 0.3, 1, () => {
      errorElement.innerText = error.message;
    });
  }
}

function clearWeatherDataFetchError() {
  fadeOutAndIn(errorElement, 0.3, 1, () => {
    errorElement.innerText = '';
  });
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
    fadeBackgroundImage(
      backgroundElement,
      getImage(
        `${weatherObject.location} ${weatherObject.condition} ${weatherObject.is_day ? 'day' : 'night'}`,
      ),
    );
    fadeInnerText(locationElement, weatherObject.location);
    fadeInnerText(countryElement, weatherObject.country, 1.1);
    fadeInnerText(
      temperatureElement,
      getTemperatureStringC(weatherObject.temp_c),
      1.3,
    );
    fadeInnerText(conditionElement, weatherObject.condition, 1.4);
  } catch (error) {
    displayWeatherDataFetchError(new Error('Data display error'));
  }
}

function createWeatherDisplay() {
  // Contains background and info display
  const weatherDisplay = document.createElement('div');
  weatherDisplay.classList.add('weather-container');

  const background = document.createElement('div');
  background.classList.add('background');
  backgroundElement = background;
  weatherDisplay.appendChild(background);

  // Info panel - Takes up right side of screen, transparent background, contains text info and graphics
  weatherDisplay.appendChild(createInfoPanel());

  return weatherDisplay;
}

export {
  createWeatherDisplay,
  updateWeatherDisplay,
  displayWeatherDataFetchError,
};
