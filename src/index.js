import { publish, subscribe } from './pubsub';
import { createWeatherDisplay, updateWeatherDisplay } from './dom';
import fetchWeatherData from './weatherAPI';

import './style.css';

document.body.appendChild(createWeatherDisplay());

subscribe('onLocationSubmit', fetchWeatherData);
subscribe('onWeatherDataFetch', updateWeatherDisplay);
publish('onLocationSubmit', 'Sapporo');
