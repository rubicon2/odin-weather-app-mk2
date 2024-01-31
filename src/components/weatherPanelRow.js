export default function createWeatherPanelRow(titleText, ...infoElements) {
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
