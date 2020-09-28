const database = require('./connection')

function createSegment (session_id, segment, db = database) {
    //console.log('creating segment wave:', segment.properties.isWave, "index:",segment.properties.index)
    is_wave     = segment.properties.isWave
    index       = segment.properties.index
    timestamp   = segment.properties.tStamp
    duration    = segment.properties.duration
    distance    = segment.properties.dist
    geometry    = segment.geometry
    
    return db('segments').insert({session_id, is_wave, index, timestamp, duration, distance, geometry}, "segment_id")  
  }


function removeSegment (segment_id, db = database) {
    console.log('error remove user not set up')
    return
}


function getSegmentsBySession (session_id, db = database) {
    return db('segments').where("session_id", session_id)

}



module.exports = {
    createSegment,
    removeSegment,
    getSegmentsBySession
}