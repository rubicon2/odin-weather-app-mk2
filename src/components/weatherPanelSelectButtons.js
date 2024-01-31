import createWeatherPanelSelectButton from './weatherPanelSelectButton';

export default function createWeatherPanelSelectButtons() {
  const weatherPanelSelectButtons = document.createElement('div');
  weatherPanelSelectButtons.classList.add(
    'weather-panel-select-button-container',
  );

  const currentButton = createWeatherPanelSelectButton();
  currentButton.innerText = 'Current';
  currentButton.classList.add('rounded-left');
  weatherPanelSelectButtons.appendChild(currentButton);

  const forecastButton = createWeatherPanelSelectButton();
  forecastButton.innerText = 'Forecast';
  forecastButton.classList.add('rounded-right');
  weatherPanelSelectButtons.appendChild(forecastButton);

  return {
    container: weatherPanelSelectButtons,
    currentButton,
    forecastButton,
  };
}
