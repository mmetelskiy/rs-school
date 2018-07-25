const request = require('request');
const WError = require('verror').WError;

const weatherConfig = require('../config').service.weather;

const weatherRequest = request.defaults({
  baseUrl: weatherConfig.baseUrl,
  qs: {
    APPID: weatherConfig.token,
    units: 'metric'
  },
  json: true
});

/*
  {
    coord: {
      lon,
      lat
    },
    weather: [
      {
        id,
        main,
        description,
        icon
      }
    ],
    base,
    main: {
      temp,
      pressure,
      humidity,
      temp_min,
      temp_max,
      sea_level,
      grnd_level
    },
    wind: {
      speed,
      deg
    },
    clouds: {
      all
    },
    rain: {
      3h
    },
    snow: {
      3h
    },
    dt,
    sys: {
      type,
      id,
      message,
      country,
      sunrise,
      sunset
    },
    id,
    name,
    cod
  }
*/

// /weather?lat=..&lon=?
exports.getWeatherByCoordinates = function (latitude, longtitude, callback) {

};

// /weather?q=...
exports.getWeatherByCityName = function (cityName, callback) {

};

request('http://localhost:3008', (error, response, body) => {
  console.log(error);
  console.log(body);
})
