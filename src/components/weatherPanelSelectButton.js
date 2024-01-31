export default function createWeatherPanelSelectButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('weather-panel-select-button');
  return button;
}
