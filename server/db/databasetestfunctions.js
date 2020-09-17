const segs = require('./../data/processedData/2020-03-22_segmented.json');
const sessMeta = require('./../data/processedData/2020-03-22_meta.json');

const {createUser, getUserEmailByID} = require('./users')
const {createSession, getSessionsByUser} = require('./sessions')
const {createSegment} = require('./segments')

createUser("test@email.com", "Henry", "Mate", "Password")
.then(userID => {
    console.log("created user, id:",userID)
    
    createSession (userID[0], sessMeta, "this is a big raw file")
    .then(sessionID => {
        console.log("created session, id:",sessionID)
        
        segs.forEach(seg=>{
            createSegment(sessionID[0], seg)
            .then(segID => {
                console.log("created segment, id:",segID)
            })
        })
    })
})