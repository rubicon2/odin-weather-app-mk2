import { publish, subscribe } from './pubsub';
import fetchWeatherData from './weatherAPI';
import {
  createWeatherDisplay,
  showForecastPanel,
  updateWeatherDisplay,
  displayWeatherDataFetchError,
} from './dom';
import Timer from './timer';

import './style.css';

document.body.appendChild(createWeatherDisplay());

const apiTimer = new Timer('WeatherAPI Fetch');
subscribe('onWeatherDataFetchStart', () => {
  apiTimer.start();
});
subscribe('onWeatherDataFetchSuccess', () => {
  apiTimer.end();
  console.log(
    `Took ${apiTimer.elapsedTime}ms for weatherAPI to give us what we want!`,
  );
});
subscribe('onWeatherDataFetchError', () => {
  apiTimer.end();
  console.log(
    `Took ${apiTimer.elapsedTime}ms for weatherAPI to error out on us!`,
  );
});

subscribe('onLocationSubmit', fetchWeatherData);
subscribe('onWeatherDataFetchSuccess', updateWeatherDisplay);
subscribe('onWeatherDataFetchError', displayWeatherDataFetchError);
publish('onLocationSubmit', 'Sapporo');

showForecastPanel();

// Testing panel transitions
let auto = true;

let snowy = false;
setInterval(() => {
  if (auto) {
    publish('onLocationSubmit', snowy ? 'Sapporo' : 'London');
    snowy = !snowy;
  }
}, 10000);

document.querySelector('input').addEventListener('focus', () => {
  auto = false;
});
