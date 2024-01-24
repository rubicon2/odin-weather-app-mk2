import { publish } from './pubsub';

const API_KEY = '05220d5fdaf44d4aba591717242201';

function getLocation(weatherApiDataJson) {
  return weatherApiDataJson.location.name;
}

function getRegion(weatherApiDataJson) {
  return weatherApiDataJson.location.region;
}

function getCountry(weatherApiDataJson) {
  return weatherApiDataJson.location.country;
}

function getCondition(weatherApiDataJson) {
  return weatherApiDataJson.current.condition.text;
}

function getTempC(weatherApiDataJson) {
  return weatherApiDataJson.current.temp_c;
}

function getTempF(weatherApiDataJson) {
  return weatherApiDataJson.current.temp_f;
}

function getHumidity(weatherApiDataJson) {
  return weatherApiDataJson.current.humidity;
}

function getWindSpeedMph(weatherApiDataJson) {
  return weatherApiDataJson.current.wind_mph;
}

function getWindSpeedKph(weatherApiDataJson) {
  return weatherApiDataJson.current.wind_kph;
}

function getIsDay(weatherApiDataJson) {
  return weatherApiDataJson.current.is_day;
}

function getIcon(weatherApiDataJson) {
  return weatherApiDataJson.current.condition.icon;
}

function extractWeatherData(weatherApiDataJson) {
  const obj = {};

  obj.location = getLocation(weatherApiDataJson);
  obj.region = getRegion(weatherApiDataJson);
  obj.country = getCountry(weatherApiDataJson);

  obj.condition = getCondition(weatherApiDataJson);

  obj.temp_c = getTempC(weatherApiDataJson);
  obj.temp_f = getTempF(weatherApiDataJson);
  obj.humidity = getHumidity(weatherApiDataJson);

  obj.wind_mph = getWindSpeedMph(weatherApiDataJson);
  obj.wind_kph = getWindSpeedKph(weatherApiDataJson);

  obj.is_day = getIsDay(weatherApiDataJson);
  obj.icon = getIcon(weatherApiDataJson);

  return obj;
}

export default async function fetchWeatherData(locationName) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationName}`,
    );
    const json = await response.json();
    publish('onWeatherDataFetch', extractWeatherData(json));
  } catch (error) {
    publish(
      'onWeatherDataFetchError',
      new Error('Please enter a valid location'),
    );
  }
}
