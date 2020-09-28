const database = require('./connection')

function createSession (user_id, meta, rawString, db = database) {
    console.log('creating session ', meta.date, meta.time)
    date = meta.date
    duration = meta.dur
    surf_dist = parseFloat(meta.waveDist)
    paddle_dist = parseFloat(meta.paddleDist)
    wave_count = meta.waveCount
    beach_direction = meta.beachDirection
    raw_file = rawString
    
    return db('sessions').insert({user_id, date, duration, surf_dist, paddle_dist, wave_count, beach_direction, raw_file}, "session_id")  
  }


function removeSession (session_id, db = database) {
    console.log('error remove user not set up')
    return
}


function getSessionsByUser (user_id, db = database) {
    return db('sessions').where("user_id", user_id)

}

function getSessionsByID (session_id, db = database) {
    return db('sessions').where("session_id", session_id)

}



module.exports = {
    createSession,
    removeSession,
    getSessionsByUser
}