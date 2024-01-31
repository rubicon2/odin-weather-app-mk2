import createWeatherForecastDayInfo from './weatherForecastDayInfo';

export default function createWeatherForecastPanel() {
  const weatherForecastPanelElement = document.createElement('div');
  weatherForecastPanelElement.classList.add('weather-panel-content');

  const forecastElements = [];
  for (let i = 0; i < 7; i += 1) {
    const dayInfo = createWeatherForecastDayInfo();
    forecastElements.push(dayInfo);
    weatherForecastPanelElement.appendChild(dayInfo.row);
  }

  return { container: weatherForecastPanelElement, forecastElements };
}
