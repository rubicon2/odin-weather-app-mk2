import createUnitComponent from './unitComponent';
import createWeatherPanelRow from './weatherPanelRow';

const degreeSymbol = '\u00B0';

export default function createWeatherForecastDayInfo() {
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

  return {
    row: rowElement,
    weekday: weekdayElement,
    temperature: temperatureComponent.measurementReadingElement,
    condition: conditionElement,
  };
}
