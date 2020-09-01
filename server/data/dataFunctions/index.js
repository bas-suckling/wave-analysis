const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData} = require('./dataProccessing')
const {writeFile} = require('./writeFiles')
 
let rawPath =  '../rawData/'
let processedPath = '../processedData/'

let date = "2020-08-01"
let session_gpx = rawPath + date + '.gpx'
let session_JSON_RAW = rawPath + date + '_RAW.json' 

let session_JSON = processedPath + date + '.json'
let waves_JSON = processedPath + date + '_segmented.json'
//let gMap_JSON = processedPath + date + '_googleMapData.json'
let lMap_JSON = processedPath + date + '_leafMapData.json'


// save raw data as json
parseTrackPoints(session_gpx)
     .then(data => writeFile(session_JSON_RAW, JSON.stringify(data)))

// Process & Save
parseTrackPoints(session_gpx)
    .then(data => sessionData(data))
    .then(dataArray => {
        writeFile((session_JSON), JSON.stringify(dataArray.data))   //  ./processed/[data] _ (BASIC) .json
        writeFile((waves_JSON), JSON.stringify(dataArray.segments)) //  ./processed/[data] _ segmented .json
        //writeFile((gMap_JSON), JSON.stringify(dataArray.gMapData))    //  ./processed/[data] _ mapData .json
        writeFile((lMap_JSON), JSON.stringify(dataArray.lMapData))    //  ./processed/[data] _ mapData .json
    })