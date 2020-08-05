const router = require('express').Router()

router.get('/', (req, res) => {
    //some function to get list of all sessions
    let tempResponse = "this is a list of all the sessions"
    res.send(tempResponse)
})

router.get('/:id', (req, res) =>{
    // some function to get the specific session data
    let tempResponse = "this is the data from a single surf session"
    res.send(tempResponse)
})

module.exports = router