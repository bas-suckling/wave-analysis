const sportsLib = require('@sports-alliance/sports-lib')
const fs = require('fs')

const gpxString = fs.readFileSync('./data/Surf_2020-07-07.gpx', 'utf8')

sportsLib.SportsLib.importFromGPX(gpxString)
    .then((event) => {
        const distance = event.getDistance();
        const duration = event.getDuration();

        console.log("Distance: ", distance)
        console.log("Duration: ", duration)
})