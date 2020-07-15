const {createJSONFile, createTrackPoints} = require('./src/createTrackPointFile')

let gpxFileName = './data/Surf_2020-07-07.gpx'
let jsonFileName = './data/Surf_2020-07-07.json'

createTrackPoints(gpxFileName)
    .then(data => createJSONFile(jsonFileName, JSON.stringify(data)))