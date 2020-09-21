const router = require('express').Router()
const user_id = 1
// 
//  router.get('/', (req, res) => { let allSessions = [
//          we dont currently have locations
//          session ids 
//                  - are unique
//                  - not "complete"        eg [34,35,78,890,1000, ...]

// router.get('/:id', (req, res) =>{
// switch not req? => 
//      meta = getSessionsByID(session_id) {repack required}
//      session = getSegmentsBySession(session_id) {repack required}

// or 
// sessions = []
// i = 0
// for getSessionsByUser{ sesh=>
//      meta = getSessionsByID(session_id) {repack required}
//      segs = getSegmentsBySession(session_id) {repack required}
//      sessions.push({i,date,meta,segs})
//      i++
// 
// router.get('/:id', (req, res) =>{ return sessions[id]? 
// or send sessions forward as a big json and front can deal w it?




const session_1 = require('../data/processedData/2020-08-30_segmented.json')
const session_2 = require('../data/processedData/2020-08-29_segmented.json')
const session_3 = require('../data/processedData/2020-08-15_segmented.json')
const session_4 = require('../data/processedData/2020-08-01_segmented.json')
const session_5 = require('../data/processedData/2020-07-07_segmented.json')
const session_6 = require('../data/processedData/2020-05-25_segmented.json')
const session_7 = require('../data/processedData/2020-05-15_segmented.json')
const session_8 = require('../data/processedData/2020-03-22_segmented.json')

const meta_1 = require('../data/processedData/2020-08-30_meta.json')
const meta_2 = require('../data/processedData/2020-08-29_meta.json')
const meta_3 = require('../data/processedData/2020-08-15_meta.json')
const meta_4 = require('../data/processedData/2020-08-01_meta.json')
const meta_5 = require('../data/processedData/2020-07-07_meta.json')
const meta_6 = require('../data/processedData/2020-05-25_meta.json')
const meta_7 = require('../data/processedData/2020-05-15_meta.json')
const meta_8 = require('../data/processedData/2020-03-22_meta.json')


router.get('/', (req, res) => {
    let allSessions = [
        {
            "date": "2020-08-30 - Gore Bay",
            "session_id": 1
        },      
        {
            "date": "2020-08-29 - Gore Bay",
            "session_id": 2
        },
        {
            "date": "2020-08-15 - Cape Palliser",
            "session_id": 3
        },
        {
            "date": "2020-08-01 - Otaki",
            "session_id": 4
        },
        {
            "date": "2020-07-07 - New Brighton",
            "session_id": 5
        },
        {
            "date": "2020-05-25 - Sumner",
            "session_id": 6
        },
        {
            "date": "2020-05-15 - Sumner",
            "session_id": 7
        },
        {
            "date": "2020-03-22 - Karitane",
            "session_id": 8
        },
    ]
    res.send(allSessions)
})

router.get('/:id', (req, res) =>{
    let currentSession = "currentSession has not been set"
    let currentMeta = "currentMeta has not been set"
     switch (req.params.id) {
         case "1":
             currentSession = session_1
             currentMeta = meta_1
             break
        case "2":
            currentSession = session_2
            currentMeta = meta_2
            break
        case "3":
            currentSession = session_3
            currentMeta = meta_3
            break
        case "4" :
            currentSession = session_4
            currentMeta = meta_4
            break
        case "5":
            currentSession = session_5
            currentMeta = meta_5
            break
        case "6":
            currentSession = session_6
            currentMeta = meta_6
            break
        case "7":
            currentSession = session_7
            currentMeta = meta_7
            break
        case "8" :
            currentSession = session_8
            currentMeta = meta_8
            break
     }
    res.send(
        {
        currentSession,
        currentMeta
    }
        )
})



module.exports = router