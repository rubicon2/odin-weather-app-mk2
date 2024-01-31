import createLocationHeader from './locationHeader';
import createCurrentWeatherPanel from './currentWeatherPanel';
import createWeatherForecastPanel from './forecastWeatherPanel';

export default function createInfoPanel() {
  const infoPanel = document.createElement('div');
  infoPanel.classList.add('side-panel');

  const locationElement = createLocationHeader();
  infoPanel.appendChild(locationElement.container);
  const { locationNameElement } = locationElement;
  const { countryElement } = locationElement;

  const weatherPanel = document.createElement('div');
  weatherPanel.classList.add('weather-panel');
  infoPanel.appendChild(weatherPanel);

  const currentWeather = createCurrentWeatherPanel();
  const { currentElements } = currentWeather;
  weatherPanel.appendChild(currentWeather.container);

  const weatherForecast = createWeatherForecastPanel();
  const { forecastElements } = weatherForecast;
  weatherPanel.appendChild(weatherForecast.container);

  return {
    container: infoPanel,
    locationElement,
    locationNameElement,
    countryElement,
    weatherPanel,
    currentWeather,
    currentElements,
    weatherForecast,
    forecastElements,
  };
}
