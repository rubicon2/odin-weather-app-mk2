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

function extractLocationData(weatherApiDataJson) {
  const obj = {};

  obj.name = getLocation(weatherApiDataJson);
  obj.region = getRegion(weatherApiDataJson);
  obj.country = getCountry(weatherApiDataJson);

  return obj;
}

function extractCurrentWeatherData(weatherApiDataJson) {
  const obj = {};

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

function extractForecastDayData(forecastDay) {
  const dayData = {};

  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  dayData.name = weekDays[new Date(forecastDay.date).getDay()];
  dayData.date = forecastDay.date;

  // Just to make getting these fields a bit shorter
  const { day } = forecastDay;
  dayData.avgtemp_c = day.avgtemp_c;
  dayData.condition = day.condition.text;
  dayData.icon = day.condition.icon;

  return dayData;
}

function extractForecastData(weatherApiDataJson) {
  const days = [];

  for (let i = 0; i < weatherApiDataJson.forecast.forecastday.length; i += 1) {
    days.push(
      extractForecastDayData(weatherApiDataJson.forecast.forecastday[i]),
    );
  }

  return days;
}

function extractWeatherData(weatherApiDataJson) {
  return {
    location: extractLocationData(weatherApiDataJson),
    current: extractCurrentWeatherData(weatherApiDataJson),
    forecast: extractForecastData(weatherApiDataJson),
  };
}

export default async function fetchWeatherData(locationName) {
  try {
    publish('onWeatherDataFetchStart');
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationName}&days=7&aqi=no&alerts=no`,
    );
    const json = await response.json();
    publish('onWeatherDataFetchSuccess', extractWeatherData(json));
  } catch (error) {
    if (!window.navigator.onLine)
      publish('onWeatherDataFetchError', new Error('No internet connection'));
    else
      publish(
        'onWeatherDataFetchError',
        new Error('Please enter a valid location'),
      );
  }
}
