import searchIconSrc from './search.svg';
import { publish } from './pubsub';
import getImage from './weatherPhotosAPI';
import {
  fade,
  fadeOutAndIn,
  fadeInnerText,
  fadeBackgroundImage,
} from './domFade';

const degreeSymbol = '\u00B0';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let currentWeatherPanel = null;
let weatherForecastPanel = null;

let backgroundElement = null;
let locationNameElement = null;
let countryElement = null;

let currentTemperatureElement = null;
let currentConditionElement = null;
let currentHumidityElement = null;
let currentWindElement = null;

let errorElement = null;

const forecastElements = [];

function getTemperatureStringC(temperatureC) {
  return `${temperatureC || ''}${degreeSymbol}C`;
}

function getTemperatureStringF(temperatureF) {
  return `${temperatureF || ''}${degreeSymbol}F`;
}

async function showForecastPanel() {
  await fade(currentWeatherPanel, 1, 0);
  await fade(weatherForecastPanel, 1, 1);
}

async function showCurrentPanel() {
  await fade(weatherForecastPanel, 1, 0);
  await fade(currentWeatherPanel, 1, 1);
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

function createWeatherPanelRow(titleText, ...infoElements) {
  const row = document.createElement('div');
  row.classList.add('weather-panel-row');

  if (titleText) {
    const title = document.createElement('span');
    title.classList.add('weather-panel-row-title');
    title.innerText = titleText;
    row.appendChild(title);
  }

  infoElements.forEach((element) => {
    row.appendChild(element);
  });

  return row;
}

function createCurrentWeatherPanel() {
  const currentWeatherPanelElement = document.createElement('div');
  currentWeatherPanelElement.classList.add('weather-panel-content');

  currentTemperatureElement = document.createElement('span');
  currentTemperatureElement.classList.add('temperature-display');
  currentWeatherPanelElement.appendChild(
    createWeatherPanelRow('Average', currentTemperatureElement),
  );

  currentConditionElement = document.createElement('div');
  currentConditionElement.classList.add('condition-display');
  currentWeatherPanelElement.appendChild(
    createWeatherPanelRow('Condition', currentConditionElement),
  );

  currentHumidityElement = document.createElement('div');
  currentHumidityElement.classList.add('humidity-display');
  currentWeatherPanelElement.appendChild(
    createWeatherPanelRow('Humidity', currentHumidityElement),
  );

  currentWindElement = document.createElement('div');
  currentWindElement.classList.add('wind-display');
  currentWeatherPanelElement.appendChild(
    createWeatherPanelRow('Wind', currentWindElement),
  );

  return currentWeatherPanelElement;
}

function createWeatherForecastDayInfo() {
  const weekdayElement = document.createElement('div');
  weekdayElement.classList.add('weather-panel-row-title');

  const temperatureElement = document.createElement('div');
  temperatureElement.classList.add('forecast-temperature');

  const tempReadingElement = document.createElement('span');
  tempReadingElement.classList.add('forecast-temperature-reading');
  temperatureElement.appendChild(tempReadingElement);

  const tempUnitElement = document.createElement('span');
  tempUnitElement.classList.add('forecast-temperature-unit');
  tempUnitElement.innerText = getTemperatureStringC('');
  temperatureElement.appendChild(tempUnitElement);

  const conditionElement = document.createElement('img');
  conditionElement.classList.add('forecast-condition');

  const rowElement = createWeatherPanelRow(
    null,
    weekdayElement,
    temperatureElement,
    conditionElement,
  );

  forecastElements.push({
    row: rowElement,
    weekday: weekdayElement,
    temperature: tempReadingElement,
    condition: conditionElement,
  });

  return rowElement;
}

function createWeatherForecastPanel() {
  const weatherForecastPanelElement = document.createElement('div');
  weatherForecastPanelElement.classList.add('weather-panel-content');

  for (let i = 0; i < 7; i += 1) {
    weatherForecastPanelElement.appendChild(createWeatherForecastDayInfo());
  }

  return weatherForecastPanelElement;
}

function createInfoPanel() {
  const infoPanel = document.createElement('div');
  infoPanel.classList.add('side-panel');

  infoPanel.appendChild(createLocationElement());

  const weatherPanel = document.createElement('div');
  weatherPanel.classList.add('weather-panel');
  infoPanel.appendChild(weatherPanel);

  currentWeatherPanel = createCurrentWeatherPanel();
  weatherPanel.appendChild(currentWeatherPanel);

  weatherForecastPanel = createWeatherForecastPanel();
  weatherPanel.appendChild(weatherForecastPanel);
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
  fadeInnerText(currentHumidityElement, weatherObject.current.humidity, 1.5);
  fadeInnerText(
    currentWindElement,
    `${weatherObject.current.wind_mph}MPH`,
    1.6,
  );
}

async function updateForecastRow(dayElements, dayForecast, fadeDuration) {
  /* eslint-disable no-param-reassign */
  await fade(dayElements.row, fadeDuration, 0);
  dayElements.weekday.innerText = dayForecast.name;
  dayElements.temperature.innerText = dayForecast.avgtemp_c;
  dayElements.condition.src = dayForecast.icon;
  fade(dayElements.row, fadeDuration, 1);
  /* eslint-enable no-param-reassign */
}

function updateForecast(weatherObject) {
  for (let i = 0; i < forecastElements.length; i += 1) {
    const fadeDuration = 1 + i * 0.2;
    const dayElements = forecastElements[i];
    const dayForecast = weatherObject.forecast[i];

    if (i === 0) dayForecast.name = 'Today';
    else if (i === 1) dayForecast.name = 'Tomorrow';
    updateForecastRow(dayElements, dayForecast, fadeDuration);
  }
}

async function updateWeatherDisplay(weatherObject) {
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

    showForecastPanel();
    // showCurrentPanel();
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
  showCurrentPanel,
  showForecastPanel,
  displayWeatherDataFetchError,
};
