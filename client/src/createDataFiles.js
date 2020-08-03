const {createJSONFile, createTrackPoints} = require('./createTrackPointFile')
const {getDataArray, getWavesArray} = require('./geoFunctions')

let gpxRawFile = '../../data/2020-08-01/Otaki_session.gpx'
let jsonRawFile = '../../data/2020-08-01/Surf_2020-08-01_RAW.json'
let jsonProcFile = '../../data/2020-08-01/Surf_2020-08-01_PROC.json'
let jsonWavesFile = '../../data/2020-08-01/Surf_2020-08-01_waves.json'


// createTrackPoints(gpxRawFile)
//     .then(data => createJSONFile(jsonRawFile, JSON.stringify(data)))
        
// createTrackPoints(gpxRawFile)
//     .then(data => getDataArray(data))  
//     .then(res => createJSONFile(jsonProcFile, JSON.stringify(res)))

createTrackPoints(gpxRawFile)
    .then(data => getDataArray(data))
    .then(dataArray => getWavesArray(dataArray))  
    .then(wavesData => createJSONFile(jsonWavesFile, JSON.stringify(wavesData)))






