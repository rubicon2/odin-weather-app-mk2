import searchIconSrc from './search.svg';
import { publish } from './pubsub';
import getImage from './weatherPhotosAPI';

const degreeSymbol = '\u00B0';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let backgroundElement = null;
let locationNameElement = null;
let countryElement = null;
let currentTemperatureElement = null;
let currentConditionElement = null;
let errorElement = null;

let forecastElements = [];

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
    if (locationInput.value) {
      // If input is same location we are already displaying, don't bother updating but don't throw any errors either
      if (
        locationInput.value.toLowerCase() !==
        locationNameElement.innerText.toLowerCase()
      )
        publish('onLocationSubmit', locationInput.value);
    } else displayWeatherDataFetchError(new Error('Please enter a location'));
  });
  searchBar.appendChild(searchButton);

  return searchContainer;
}

function createLocationElement() {
  const locationElement = document.createElement('div');
  locationElement.classList.add('location-header');

  locationNameElement = document.createElement('div');
  locationNameElement.classList.add('location-display');
  locationElement.appendChild(locationNameElement);

  countryElement = document.createElement('div');
  countryElement.classList.add('country-display');
  locationElement.appendChild(countryElement);

  return locationElement;
}

function createCurrentWeatherPanel() {
  const currentWeatherPanel = document.createElement('div');
  currentWeatherPanel.classList.add('current-weather-panel');

  currentTemperatureElement = document.createElement('div');
  currentTemperatureElement.classList.add('temperature-display');
  currentWeatherPanel.appendChild(currentTemperatureElement);

  currentConditionElement = document.createElement('div');
  currentConditionElement.classList.add('condition-display');
  currentWeatherPanel.appendChild(currentConditionElement);

  return currentWeatherPanel;
}

function createWeatherForecastDayInfo() {
  const forecastDayElement = document.createElement('div');
  forecastDayElement.classList.add('forecast-day');

  const weekdayElement = document.createElement('div');
  weekdayElement.classList.add('forecast-weekday');
  forecastDayElement.appendChild(weekdayElement);

  const temperatureElement = document.createElement('div');
  temperatureElement.classList.add('forecast-temperature');
  forecastDayElement.appendChild(temperatureElement);

  const conditionElement = document.createElement('img');
  conditionElement.classList.add('forecast-condition');
  forecastDayElement.appendChild(conditionElement);

  forecastElements.push({
    weekday: weekdayElement,
    temperature: temperatureElement,
    condition: conditionElement,
  });

  return forecastDayElement;
}

function createWeatherForecastPanel() {
  const weatherForecastPanel = document.createElement('div');
  weatherForecastPanel.classList.add('weather-forecast-panel');

  for (let i = 0; i < 7; i += 1) {
    weatherForecastPanel.appendChild(createWeatherForecastDayInfo());
  }

  return weatherForecastPanel;
}

function createInfoPanel() {
  const infoPanel = document.createElement('div');
  infoPanel.classList.add('side-panel');

  infoPanel.appendChild(createLocationElement());

  const weatherPanel = document.createElement('div');
  weatherPanel.classList.add('weather-panel');
  infoPanel.appendChild(weatherPanel);

  weatherPanel.appendChild(createCurrentWeatherPanel());
  weatherPanel.appendChild(createWeatherForecastPanel());
  infoPanel.appendChild(createSearchBar());

  return infoPanel;
}

function updateLocation(weatherObject) {
  fadeInnerText(locationNameElement, weatherObject.location.name);
  fadeInnerText(countryElement, weatherObject.location.country, 1.1);
}

function updateCurrentWeather(weatherObject) {
  fadeInnerText(
    currentTemperatureElement,
    getTemperatureStringC(weatherObject.current.temp_c),
    1.3,
  );
  fadeInnerText(currentConditionElement, weatherObject.current.condition, 1.4);
}

function updateForecast(weatherObject) {
  for (let i = 0; i < forecastElements.length; i += 1) {
    const dayElements = forecastElements[i];
    const dayForecast = weatherObject.forecast[i];

    dayElements.weekday.innerText = dayForecast.name;
    dayElements.temperature.innerText = getTemperatureStringC(
      dayForecast.avgtemp_c,
    );
    dayElements.condition.src = dayForecast.icon;
  }
}

function updateWeatherDisplay(weatherObject) {
  // In case weatherObject is null for whatever reason, or elements not set up yet
  try {
    clearWeatherDataFetchError();
    fadeBackgroundImage(
      backgroundElement,
      getImage(
        `${weatherObject.location.name} ${weatherObject.current.condition} ${weatherObject.current.is_day ? 'day' : 'night'}`,
      ),
    );
    updateLocation(weatherObject);
    updateCurrentWeather(weatherObject);
    updateForecast(weatherObject);
  } catch (error) {
    console.log(error);
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
