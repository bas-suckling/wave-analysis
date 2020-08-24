const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData} = require('./dataProccessing')
const {writeFile} = require('./writeFiles')
 
let rawPath =  '../rawData/'
let processedPath = '../processedData/'

let date = "2020-08-01"
let session_gpx = rawPath + date + '.gpx'
let session_JSON_RAW = rawPath + date + '_RAW.json' 

let session_JSON = processedPath + date + '.json'
let waves_JSON = processedPath + date + '_waves.json'


parseTrackPoints(session_gpx)
    .then(data => sessionData(data))  
    .then(dataArray => writeFile((session_JSON), JSON.stringify(dataArray.data)))

    parseTrackPoints(session_gpx)
    .then(data => sessionData(data))  
    .then(dataArray => writeFile((waves_JSON), JSON.stringify(dataArray.segments)))

parseTrackPoints(session_gpx)
    .then(data => writeFile(session_JSON_RAW, JSON.stringify(data)))