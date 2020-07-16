const {createJSONFile, createTrackPoints} = require('./src/createTrackPointFile')
const {getTotalDistance, getSpeedArray} = require('./src/geoFunctions')

let gpxFileName = './data/Surf_2020-07-07.gpx'
let jsonFileName = './data/Surf_2020-07-07.json'
let speedFileName = './data/Surf_2020-07-07_speed.json'

// createTrackPoints(gpxFileName)
//     .then(data => createJSONFile(jsonFileName, JSON.stringify(data)))

createTrackPoints(gpxFileName)
    .then(data => (getSpeedArray(data)))
    .then(res => createJSONFile(speedFileName, JSON.stringify(res)))