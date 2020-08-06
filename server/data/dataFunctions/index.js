const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData, wavesData, averageSpeed} = require('./dataProccessing')
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
    .then(dataArray => writeFile((session_JSON), JSON.stringify(averageSpeed(dataArray))))

parseTrackPoints(rawPath+session_gpx)
    .then(data => sessionData(data))
    .then(dataArray => wavesData(averageSpeed(dataArray)))  
    .then(wavesData => writeFile((waves_JSON), JSON.stringify(wavesData)))

parseTrackPoints(session_gpx)
    .then(data => writeFile(session_JSON_RAW, JSON.stringify(data)))