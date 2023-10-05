//fetching data from weather stack api

const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=f7aea6d04acd07e34d28e219d47c1272&query=${lat},${lon}&units=m`;

  request({ url: weatherUrl, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
      return;
    } else if (body.error) {
      callback("Unable to find location", undefined);
      return;
    }
    const temp = body.current.temperature;
    const feelsLike = body.current.feelslike;
    const desc = body.current.weather_descriptions[0];

    callback(
      undefined,
      `${desc}. It is currently ${temp} degrees out, but feels like ${feelsLike} degrees out.`
    );
  });
};

module.exports = forecast;
