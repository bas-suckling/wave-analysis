const router = require('express').Router()

router.get('/', (req, res) => {
    //some function to get list of all sessions
    let tempData = [
        {
            "date": "2020-05-25",
            "session_id": 1
        },
        {
            "date": "2020-07-07",
            "session_id": 2
        },
        {
            "date": "2020-07-07",
            "session_id": 3
        }
    ]
    res.send(tempData)
})

router.get('/:id', (req, res) =>{
    // some function to get the specific session data
    let tempResponse = "this is the data from a single surf session"
    res.send(tempResponse)
})

module.exports = router