const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData, wavesData, averageSpeed} = require('./dataProccessing')
const {writeFile} = require('./writeFiles')
 
let rawPath =  '../rawData/'
let processedPath = '../processedData/'

let session_gpx = rawPath +'2020-05-25.gpx'
let session_JSON = processedPath + '2020-05-25.json'
let waves_JSON = processedPath + '2020-05-25_waves.json'


parseTrackPoints(session_gpx)
    .then(data => sessionData(data))  
    .then(dataArray => writeFile((session_JSON), JSON.stringify(averageSpeed(dataArray))))

parseTrackPoints(rawPath+session_gpx)
    .then(data => sessionData(data))
    .then(dataArray => wavesData(averageSpeed(dataArray)))  
    .then(wavesData => writeFile((waves_JSON), JSON.stringify(wavesData)))


