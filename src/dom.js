import searchIconSrc from './search.svg';
import { publish } from './pubsub';
import getImage from './weatherPhotosAPI';
import { delay, fade, fadeInnerText, fadeBackgroundImage } from './domFade';

const degreeSymbol = '\u00B0';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let currentWeatherPanel = null;
let weatherForecastPanel = null;

let backgroundElement = null;
let locationNameElement = null;
let countryElement = null;

let errorElement = null;

let weatherObject = null;

const currentElements = {
  temperature: {},
  condition: {},
  humidity: {},
  wind: {},
};
const forecastElements = [];

const fadeDelay = 250;
let selectedPanel = 'none';
let isPanelFadeHappening = false;

async function fadeCurrentRows(fadeDuration, targetOpacity) {
  fade(currentElements.temperature.row, fadeDuration, targetOpacity);
  await delay(fadeDelay);
  fade(currentElements.condition.row, fadeDuration, targetOpacity);
  await delay(fadeDelay);
  fade(currentElements.humidity.row, fadeDuration, targetOpacity);
  await delay(fadeDelay);
  fade(currentElements.wind.row, fadeDuration, targetOpacity);
}

async function fadeForecastRows(fadeDuration, targetOpacity) {
  /* eslint-disable -- stop whining */
  for (let forecastElement of forecastElements) {
    fade(forecastElement.row, fadeDuration, targetOpacity);
    await delay(fadeDelay);
  }
  /* eslint-enable */
}

async function displayWeatherDataFetchError(error) {
  if (errorElement.innerText !== error.message) {
    await fade(errorElement, 0.3, 0);
    errorElement.innerText = error.message;
    fade(errorElement, 0.3, 1);
  }
}

async function clearWeatherDataFetchError() {
  await fade(errorElement, 0.3, 0);
  errorElement.innerText = '';
}

function createWeatherPanelSelectButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('weather-panel-select-button');
  return button;
}

function createSearchBar() {
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');

  const weatherPanelSelectButtons = document.createElement('div');
  weatherPanelSelectButtons.classList.add(
    'weather-panel-select-button-container',
  );
  searchContainer.appendChild(weatherPanelSelectButtons);

  const currentButton = createWeatherPanelSelectButton();
  currentButton.innerText = 'Current';
  currentButton.classList.add('rounded-left');
  weatherPanelSelectButtons.appendChild(currentButton);
  currentButton.addEventListener('click', () => {
    showCurrentPanel();
  });

  const forecastButton = createWeatherPanelSelectButton();
  forecastButton.innerText = 'Forecast';
  forecastButton.classList.add('rounded-right');
  forecastButton.addEventListener('click', () => {
    showForecastPanel();
  });

  weatherPanelSelectButtons.appendChild(forecastButton);

  const searchBar = document.createElement('div');
  searchBar.classList.add('search-bar');
  searchContainer.appendChild(searchBar);

  const locationInput = document.createElement('input');
  locationInput.classList.add('rounded-left');
  locationInput.type = 'text';
  locationInput.placeholder = 'Search...';
  searchBar.appendChild(locationInput);

  const searchButton = document.createElement('div');
  searchButton.classList.add('search-button', 'rounded-right');

  const searchIcon = document.createElement('img');
  searchIcon.src = searchIconSrc;
  searchButton.appendChild(searchIcon);

  errorElement = document.createElement('div');
  errorElement.innerText = 'Error message';
  errorElement.classList.add('error-display');
  searchContainer.appendChild(errorElement);

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

function createUnitComponent(unit) {
  const containerElement = document.createElement('div');
  containerElement.classList.add('unit-component');

  const measurementReadingElement = document.createElement('span');
  measurementReadingElement.classList.add('measurement-reading');
  containerElement.appendChild(measurementReadingElement);

  const measurementUnitElement = document.createElement('span');
  measurementUnitElement.classList.add('measurement-unit');
  measurementUnitElement.innerText = unit;
  containerElement.appendChild(measurementUnitElement);

  return { containerElement, measurementReadingElement };
}

function createCurrentWeatherPanel() {
  const currentWeatherPanelElement = document.createElement('div');
  currentWeatherPanelElement.classList.add('weather-panel-content');

  const currentTemperatureComponent = createUnitComponent(`${degreeSymbol}C`);
  const temperatureRow = createWeatherPanelRow(
    'Average',
    currentTemperatureComponent.containerElement,
  );
  currentWeatherPanelElement.appendChild(temperatureRow);

  const currentConditionElement = document.createElement('img');
  currentConditionElement.classList.add(
    'condition-icon',
    'current-condition-icon',
  );
  const conditionRow = createWeatherPanelRow(
    'Condition',
    currentConditionElement,
  );
  currentWeatherPanelElement.appendChild(conditionRow);

  const currentHumidityComponent = createUnitComponent('%');
  const humidityRow = createWeatherPanelRow(
    'Humidity',
    currentHumidityComponent.containerElement,
  );
  currentWeatherPanelElement.appendChild(humidityRow);

  const currentWindComponent = createUnitComponent('mph');
  const windRow = createWeatherPanelRow(
    'Wind',
    currentWindComponent.containerElement,
  );
  currentWeatherPanelElement.appendChild(windRow);

  // Grab all the refs we will need later to update info and animate fades
  currentElements.temperature = {
    row: temperatureRow,
    info: currentTemperatureComponent.measurementReadingElement,
  };

  currentElements.condition = {
    row: conditionRow,
    info: currentConditionElement,
  };

  currentElements.humidity = {
    row: humidityRow,
    info: currentHumidityComponent.measurementReadingElement,
  };

  currentElements.wind = {
    row: windRow,
    info: currentWindComponent.measurementReadingElement,
  };

  // Add css class to adjust grid layout so all the info lines up nicely
  currentTemperatureComponent.containerElement.classList.add(
    'unit-component-normalized',
  );
  currentHumidityComponent.containerElement.classList.add(
    'unit-component-normalized',
  );
  currentWindComponent.containerElement.classList.add(
    'unit-component-normalized',
  );

  return currentWeatherPanelElement;
}

function createWeatherForecastDayInfo() {
  const weekdayElement = document.createElement('div');
  weekdayElement.classList.add('weather-panel-row-title');

  const temperatureComponent = createUnitComponent(`${degreeSymbol}C`);

  const conditionElement = document.createElement('img');
  conditionElement.classList.add('condition-icon');

  const rowElement = createWeatherPanelRow(
    null,
    weekdayElement,
    temperatureComponent.containerElement,
    conditionElement,
  );

  forecastElements.push({
    row: rowElement,
    weekday: weekdayElement,
    temperature: temperatureComponent.measurementReadingElement,
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

  return infoPanel;
}

function updateLocation() {
  fadeInnerText(locationNameElement, weatherObject.location.name);
  fadeInnerText(countryElement, weatherObject.location.country, 1.1);
}

async function updateCurrentWeather() {
  await fadeCurrentRows(1, 0);
  currentElements.temperature.info.innerText = Number.parseFloat(
    weatherObject.current.temp_c,
  ).toFixed(1);
  currentElements.condition.info.src = weatherObject.current.icon;
  currentElements.humidity.info.innerText = weatherObject.current.humidity;
  currentElements.wind.info.innerText = weatherObject.current.wind_mph;
  if (selectedPanel === 'current') await fadeCurrentRows(1, 1);
}

async function updateForecast() {
  await fadeForecastRows(1, 0);
  for (let i = 0; i < forecastElements.length; i += 1) {
    const dayElements = forecastElements[i];
    const dayForecast = weatherObject.forecast[i];
    if (i === 0) dayForecast.name = 'Today';
    else if (i === 1) dayForecast.name = 'Tomorrow';
    dayElements.weekday.innerText = dayForecast.name;
    dayElements.temperature.innerText = Number.parseFloat(
      dayForecast.avgtemp_c,
    ).toFixed(1);
    dayElements.condition.src = dayForecast.icon;
  }
  if (selectedPanel === 'forecast') await fadeForecastRows(1, 1);
}

async function showForecastPanel() {
  /* Checking if transition is happening before triggering it is kind of hacky
   * but otherwise it is very easy to interrupt the transition before it is done.
   * Current and forecast buttons in top left just ignore your clicks, which doesn't
   * feel good as the user. A better solution might be to have an animation queue
   * for each element, or storing a list of elements that are currently having css
   * properties changed, and when a new fade is started, it checks the list and
   * stops the existing animation before starting the new one. */
  if (!isPanelFadeHappening) {
    selectedPanel = 'forecast';
    isPanelFadeHappening = true;
    await fadeCurrentRows(1, 0);
    updateForecast(weatherObject);
    isPanelFadeHappening = false;
  }
}

async function showCurrentPanel() {
  if (!isPanelFadeHappening) {
    selectedPanel = 'current';
    isPanelFadeHappening = true;
    await fadeForecastRows(1, 0);
    updateCurrentWeather(weatherObject);
    isPanelFadeHappening = false;
  }
}

async function updateWeatherDisplay(newWeatherObject) {
  // In case weatherObject is null for whatever reason, or elements not set up yet
  try {
    weatherObject = newWeatherObject;
    clearWeatherDataFetchError();
    fadeBackgroundImage(
      backgroundElement,
      getImage(
        `${weatherObject.location.name} ${weatherObject.current.condition} ${weatherObject.current.is_day ? 'day' : 'night'}`,
      ),
    );
    updateLocation();
    updateCurrentWeather();
    updateForecast();
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

  weatherDisplay.appendChild(createSearchBar());

  return weatherDisplay;
}

export {
  createWeatherDisplay,
  updateWeatherDisplay,
  showCurrentPanel,
  showForecastPanel,
  displayWeatherDataFetchError,
};
