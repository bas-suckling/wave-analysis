const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData} = require('./dataProccessing')
const {writeFile} = require('./writeFiles')

let rawPath =  '../rawData/'
let processedPath = '../processedData/'

//let date = "2020-05-25"     //  Sumner  
//let date = "2020-07-07"     //  N.Brighton  
//let date = "2020-08-01"     //  Otaki
let date = "2020-08-15"     //  C.Palliser

let session_gpx = rawPath + date + '.gpx'                   // input location
let session_JSON_RAW = rawPath + date + '_RAW.json'         // output location: not required

let session_JSON = processedPath + date + '_processed.json' // output location: not required
let waves_JSON = processedPath + date + '_segmented.json'
let meta_JSON = processedPath + date + '_meta.json'


// save raw data as json
parseTrackPoints(session_gpx)
     .then(data => writeFile(session_JSON_RAW, JSON.stringify(data))) // not required

// Process & Save
parseTrackPoints(session_gpx)
    .then(data => sessionData(data))
    .then(dataArray => {
        writeFile((session_JSON), JSON.stringify(dataArray.data))   //  ./processed/[data] _ processed .json  - not required
        writeFile((waves_JSON), JSON.stringify(dataArray.segments)) //  ./processed/[data] _ segmented .json
        writeFile((meta_JSON), JSON.stringify(dataArray.meta)) //  ./processed/[data] _ meta .json
    })