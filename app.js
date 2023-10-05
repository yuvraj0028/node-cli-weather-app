const yargs = require("yargs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

yargs.command({
  command: "get",
  describe: "Fetch weather of provided location",
  builder: {
    location: {
      type: "string",
      demandOption: true,
      describe: "location name",
    },
  },
  handler: (argv) => {
    geocode(argv.location, (errorGeo, dataGeo) => {
      if (errorGeo) return console.log(`Error - ${errorGeo}`);
      forecast(dataGeo.lat, dataGeo.lon, (error, data) => {
        if (error) return console.log(error);
        console.log(dataGeo.place);
        console.log(data);
      });
    });
  },
});

yargs.parse();
