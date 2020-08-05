const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData, wavesData, averageSpeed} = require('./dataProccessing')
const writeFile = require('./writeFiles')
 
let rawPath =  '../rawData/'
let processedPath = '../processedData/'

let session_gpx = 'Surf_2020-08-01.gpx'
let session_JSON = 'Surf_2020-08-01.json'
let waves_JSON = 'Surf_2020-08-01_waves.json'
 
parseTrackPoints(session_gpx)
    .then(data => sessionData(data))  
    .then(dataArray => writeFile((processedPath+session_JSON), JSON.stringify(averageSpeed(dataArray))))

parseTrackPoints(session_gpx)
    .then(data => sessionData(data))
    .then(dataArray => wavesData(averageSpeed(dataArray)))  
    .then(wavesData => writeFile((processedPath+waves_JSON), JSON.stringify(wavesData)))


