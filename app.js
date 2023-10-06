const yargs = require("yargs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (process.argv[2] !== "get") {
  console.log(
    `Enter the command ' node app.js get --location="{your location}" '`
  );
}

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
    geocode(argv.location, (errorGeo, { lat, lon, place } = {}) => {
      if (errorGeo) return console.log(`Error - ${errorGeo}`);
      forecast(lat, lon, (error, data) => {
        if (error) return console.log(error);
        console.log(place);
        console.log(data);
      });
    });
  },
});

yargs.parse();
