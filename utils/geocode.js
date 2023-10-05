const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://geocode.maps.co/search?q=${address}`;

  request({ url: url, json: true }, (error, response, body) => {
    const data = body;
    if (error) {
      callback("Unable to connect to location services!", undefined);
      return;
    } else if (data.length === 0) {
      callback("Unable to find location, try another search", undefined);
      return;
    }

    callback(undefined, {
      lat: data[0].lat,
      lon: data[0].lon,
      place: data[0].display_name,
    });
  });
};

module.exports = geocode;
