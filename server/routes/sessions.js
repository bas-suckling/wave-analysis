const router = require('express').Router()

const session_1 = require('../data/processedData/2020-08-01_segmented.json')
const session_2 = require('../data/processedData/2020-07-07_segmented.json')
const session_3 = require('../data/processedData/2020-05-25_segmented.json')

const meta_1 = require('../data/processedData/2020-08-01_meta.json')
const meta_2 = require('../data/processedData/2020-07-07_meta.json')
const meta_3 = require('../data/processedData/2020-05-25_meta.json')


router.get('/', (req, res) => {
    //some function to get list of all sessions
    let allSessions = [
        {
            "date": "2020-05-25",
            "session_id": 1
        },
        {
            "date": "2020-07-07",
            "session_id": 2
        },
        {
            "date": "2020-08-01",
            "session_id": 3
        }
    ]
    res.send(allSessions)
})

router.get('/:id', (req, res) =>{
    // some function to get the specific session data
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
     }
    res.send(
        {
        currentSession,
        currentMeta
    }
        )
})



module.exports = router