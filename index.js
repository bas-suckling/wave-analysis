const {createJSONFile, createTrackPoints} = require('./src/createTrackPointFile')
const {getDistanceArray, getSpeedArray} = require('./src/geoFunctions')

let gpxFileName = './data/2020-05-25/Surf_2020-05-25.gpx'
let jsonFileName = './data/2020-05-25/Surf_2020-05-25.json'
let speedFileName = './data/2020-05-25/Surf_2020-05-25_speed.json'
let distanceFileName = './data/2020-05-25/Surf_2020-05-25_distance.json'

createTrackPoints(gpxFileName)
    .then(data => createJSONFile(jsonFileName, JSON.stringify(data)))

createTrackPoints(gpxFileName)
    .then(data => (getSpeedArray(data)))
    .then(res => createJSONFile(speedFileName, JSON.stringify(res)))

createTrackPoints(gpxFileName)
    .then(data => (getDistanceArray(data)))
    .then(res => createJSONFile(distanceFileName, JSON.stringify(res)))