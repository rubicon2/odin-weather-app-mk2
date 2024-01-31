import createWeatherPanelRow from './weatherPanelRow';
import createUnitComponent from './unitComponent';

const degreeSymbol = '\u00B0';

export default function createCurrentWeatherPanel() {
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
  const currentElements = {};
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

  return { container: currentWeatherPanelElement, currentElements };
}
