const {parseTrackPoints} = require('./parseTrackPoints')
const {sessionData} = require('./dataProccessing')
const {writeFile} = require('./writeFiles')

let rawPath =  '../rawData/'
let processedPath = '../processedData/'

let dateArray = ["2020-05-25", "2020-07-07", "2020-08-01", "2020-08-15", "2020-08-29", "2020-08-30", "2020-05-15", "2020-03-22"]//, "2020-09-20"]



processAllData(dateArray)

function processAllData (dateArray) {
    
    dateArray.forEach(date => {
        
        let session_gpx = rawPath + date + '.gpx'                   // label input location
        let waves_JSON = processedPath + date + '_segmented.json'   // label data out
        let meta_JSON = processedPath + date + '_meta.json'         // label meta out
        
        // Process & Save
        parseTrackPoints(session_gpx)
            .then(data => sessionData(data))
            .then(dataArray => {
                writeFile((waves_JSON), JSON.stringify(dataArray.segments)) //  write data out
                writeFile((meta_JSON), JSON.stringify(dataArray.meta))      //  write meta out
            })
            .then(done=>{
                console.log("processed session:",date)
            })
    });

}



