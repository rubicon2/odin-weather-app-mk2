import { publish } from './pubsub';
import getImage from './weatherPhotosAPI';
import { delay, fade, fadeInnerText, fadeBackgroundImage } from './domFade';
import createSearchBar from './components/searchBar/searchBar';
import createLocationHeader from './components/locationHeader';
import createCurrentWeatherPanel from './components/currentWeatherPanel';
import createWeatherForecastPanel from './components/forecastWeatherPanel';

// Store refs to the elements that will update, so we don't have to document.querySelector() every time
let backgroundElement = null;
let locationNameElement = null;
let countryElement = null;

let errorElement = null;

let weatherObject = null;

let currentElements = {};
let forecastElements = [];

const fadeDelay = 250;
let selectedPanel = 'none';
let isPanelFadeHappening = false;

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

function createInfoPanel() {
  const infoPanel = document.createElement('div');
  infoPanel.classList.add('side-panel');

  const locationElement = createLocationHeader();
  infoPanel.appendChild(locationElement.container);
  locationNameElement = locationElement.locationNameElement;
  countryElement = locationElement.countryElement;

  const weatherPanel = document.createElement('div');
  weatherPanel.classList.add('weather-panel');
  infoPanel.appendChild(weatherPanel);

  const currentWeather = createCurrentWeatherPanel();
  currentElements = currentWeather.currentElements;
  weatherPanel.appendChild(currentWeather.container);

  const weatherForecast = createWeatherForecastPanel();
  forecastElements = weatherForecast.forecastElements;
  weatherPanel.appendChild(weatherForecast.container);

  return infoPanel;
}

function updateLocation() {
  fadeInnerText(locationNameElement, weatherObject.location.name);
  fadeInnerText(countryElement, weatherObject.location.country, 1.1);
}

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

async function showCurrentPanel() {
  if (!isPanelFadeHappening) {
    selectedPanel = 'current';
    isPanelFadeHappening = true;
    await fadeForecastRows(1, 0);
    updateCurrentWeather(weatherObject);
    isPanelFadeHappening = false;
  }
}

function updateWeatherDisplay(newWeatherObject) {
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

  const searchBar = createSearchBar();
  errorElement = searchBar.errorElement;
  // Hook up buttons
  searchBar.currentButton.addEventListener('click', () => {
    showCurrentPanel();
  });
  searchBar.forecastButton.addEventListener('click', () => {
    showForecastPanel();
  });
  searchBar.searchButton.addEventListener('click', () => {
    const inputValue = searchBar.locationInput.value;
    if (inputValue) {
      // If input is same location we are already displaying, don't bother updating but don't throw any errors either
      if (
        inputValue.toLowerCase() !== locationNameElement.innerText.toLowerCase()
      ) {
        publish('onLocationSubmit', inputValue);
      } else {
        clearWeatherDataFetchError();
      }
    } else displayWeatherDataFetchError(new Error('Please enter a location'));
  });
  weatherDisplay.appendChild(searchBar.container);

  return weatherDisplay;
}

export {
  createWeatherDisplay,
  updateWeatherDisplay,
  showCurrentPanel,
  showForecastPanel,
  displayWeatherDataFetchError,
};
