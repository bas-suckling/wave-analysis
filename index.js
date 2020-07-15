const {createJSONFile, createTrackPoints} = require('./src/createTrackPointFile')
const {getTotalDistance, getSpeedArray} = require('./src/geoFunctions')

let gpxFileName = './data/Surf_2020-07-07.gpx'
let jsonFileName = './data/Surf_2020-07-07.json'

// createTrackPoints(gpxFileName)
//     .then(data => createJSONFile(jsonFileName, JSON.stringify(data)))

createTrackPoints(gpxFileName)
    .then(data => console.log(getSpeedArray(data)))