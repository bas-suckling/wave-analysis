const {createJSONFile, createTrackPoints} = require('./createTrackPointFile')
const {getDataArray} = require('./geoFunctions')

let gpxRawFile = './data/2020-05-25/Surf_2020-05-25.gpx'
let jsonRawFile = './data/2020-05-25/Surf_2020-05-25_RAW.json'
let jsonProcFile = './data/2020-05-25/Surf_2020-05-25_PROC.json'


createTrackPoints(gpxRawFile)
    .then(data => createJSONFile(jsonRawFile, JSON.stringify(data)))
        
createTrackPoints(gpxRawFile)
    .then(data => getDataArray(data))  
    .then(res => createJSONFile(jsonProcFile, JSON.stringify(res)))    


