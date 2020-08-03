const {createJSONFile, createTrackPoints} = require('./createTrackPointFile')
const {getDataArray} = require('./geoFunctions')

let gpxRawFile = '../../data/2020-08-01/Otaki_session.gpx'
let jsonRawFile = '../../data/2020-08-01/Surf_2020-08-01_RAW.json'
let jsonProcFile = '../../data/2020-08-01/Surf_2020-08-01_PROC.json'


createTrackPoints(gpxRawFile)
    .then(data => createJSONFile(jsonRawFile, JSON.stringify(data)))
        
createTrackPoints(gpxRawFile)
    .then(data => getDataArray(data))  
    .then(res => createJSONFile(jsonProcFile, JSON.stringify(res)))





