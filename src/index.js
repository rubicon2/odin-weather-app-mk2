import { publish, subscribe } from './pubsub';
import fetchWeatherData from './weatherAPI';
import {
  createWeatherDisplay,
  updateWeatherDisplay,
  displayWeatherDataFetchError,
} from './dom';

import './style.css';

document.body.appendChild(createWeatherDisplay());

subscribe('onLocationSubmit', fetchWeatherData);
subscribe('onWeatherDataFetch', updateWeatherDisplay);
subscribe('onWeatherDataFetchError', displayWeatherDataFetchError);
publish('onLocationSubmit', 'Sapporo');
