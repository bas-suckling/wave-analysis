//const segs = require('./../data/processedData/2020-03-22_segmented.json');
//const sessMeta = require('./../data/processedData/2020-03-22_meta.json');
const {parseTrackPoints} = require('../data/dataFunctions/parseTrackPoints')
const {sessionData} = require('../data/dataFunctions/dataProccessing')
const rawPath =  '../data/rawData/'
const dateArray = ["2020-05-25", "2020-07-07", "2020-08-01", "2020-08-15", "2020-08-29", "2020-08-30", "2020-05-15", "2020-03-22"]//, "2020-09-20"]
    
const {createUser, getUserEmailByID} = require('./users')
const {createSession, getSessionsByUser} = require('./sessions')
const {createSegment} = require('./segments')


// create user
createUser("test@email.com", "Henry", "Mate", "Password")
.then(userID => {
    console.log("created user, id:",userID)

    //create sessions
    dateArray.forEach(date => {
        parseTrackPoints(rawPath + date + '.gpx')
            .then(data => sessionData(data))
            .then(dataArray => {
                createSession (userID[0], dataArray.meta, dataArray.raw)
                .then(sessionID => {
                    console.log("created session, id:",sessionID)
                    dataArray.segments.forEach(seg=>{
                        createSegment(sessionID[0], seg)
                        // .then(segID => {
                        //     console.log("created segment, id:",segID)
                        // })
                    })
                })
            })
        //console.log(date)
    })
})