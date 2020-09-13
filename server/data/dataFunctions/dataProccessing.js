const geolib = require('geolib');
const {convertUnixTime, parseTime, timeRead} = require('./timeConversions');
const {findBeachDirection, setIsWave, MIN_SURF_SPEED} = require ('./bearingFunctions');
const {smoothArray} = require ('./speedFunctions');

const MAX_SURF_SPEED = 30
const KMPH_CONVERT = 3.6
const MIN_SEGMENT_LENGTH = 6
const SMOOTH_WEIGHT = 4
const ACCURACY = 0.01

const V = false // verbose


// ---------------------------------------------------  M A I N - F U N C T I O N  ----------------------------
function sessionData(rawJSONData){
    let processed = processTrackPoints(rawJSONData)                         // (points)->(pairs); calcs; beachDirArray;
    let beachDirection = findBeachDirection(processed.waveDirections)       // returns assumed dir of beach from all fast moves
    let smoothedData = smoothArray(processed.trackPoints, SMOOTH_WEIGHT)    // smooths all track speeds
    let finalProcess = setIsWave(smoothedData, beachDirection, V)           // set pair.isWave bool for all pairs
    let segments = createSegments (finalProcess)                            // separate data into segments
    let meta = getMetaData(rawJSONData,segments)                            // - not currently used
    

    if(V){
        console.log("complete: saved ",meta.waveCount, 'waves')
        console.log("")
    }

    return({
        "meta": meta,
        "segments": segments,
        "data": finalProcess
    })
}
// ------------------------------------------------------------------------------------------------------------





// ---------------------------------------------------  I N I T I A L - P R O C E S S  -------------------------
function processTrackPoints(inputdata) {
    let trackPoints = []
    let waveDirections = []
    
    for (let i = 0; i < inputdata.length - 1 ; i++) {
        let p1 = {
            "lat": inputdata[i].latitude,
            "lon": inputdata[i].longitude,
            "time": convertUnixTime(parseTime(inputdata[i].timestamp))
        }
        let p2 = {
            "lat": inputdata[i+1].latitude,
            "lon": inputdata[i+1].longitude,
            "time": convertUnixTime(parseTime(inputdata[i+1].timestamp))
        }

        let distanceIncrement = (geolib.getPreciseDistance(p1, p2, ACCURACY))
        let bearing = Math.floor(geolib.getRhumbLineBearing(p1, p2))
        let speed = KMPH_CONVERT*(geolib.getSpeed(p1,p2))
        if (speed > MIN_SURF_SPEED) {
            speed = setMaxSpeed(speed)
            waveDirections.push(bearing)
        }

        trackPoints.push({
            "start": p1,
            "end": p2,
            "distance": distanceIncrement,
            "speed": speed,
            "bearing": bearing,
            "isWave": false
        })
    }
    return {"trackPoints": trackPoints, "waveDirections": waveDirections}
}

function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
        return MAX_SURF_SPEED
    }
    return speed
}
// -------------------------------------------------------------------------------------------------------------




// ---------------------------------------------------  S E G M E N T S  ---------------------------------------
function createSegments (trackPoints) {
    split = initSplit(trackPoints)
    segs = combSegs(split)
    output = addMeta(segs)
    return output
}
    

function initSplit(trackPoints){
    let segmentArray = []
    let segment = [trackPoints[0]]
    for (let i = 1; i < trackPoints.length; i++) {
        if (trackPoints[i].isWave == trackPoints[i-1].isWave) { //if same
            segment.push(trackPoints[i])
        }else{
            segmentArray.push(segment) 
            segment = [trackPoints[i]]
        }
    }
    return(segmentArray)
}

function combSegs(segmentArray){    //combine adjacent segments (with same isWave values)
    for (let segSize = 1; segSize < MIN_SEGMENT_LENGTH; segSize++){
        for (let i = 1; i < segmentArray.length-1; i++) {
            
            let segDur = (segmentArray[i][segmentArray[i].length-1].end.time-segmentArray[i][0].start.time)/1000
            if (segDur == segSize){  // combine with segs to either side
                segmentArray[i-1]=segmentArray[i-1].concat(segmentArray[i])     // add short seg to prev
                segmentArray[i-1]=segmentArray[i-1].concat(segmentArray[i+1])   // also combine with the folllowing seg (now of same type)
                segmentArray.splice(i,2)                                        // remove 2 segs (now joined to i-1)
                i--
            }
        }    
    }
    return(segmentArray)
}
    
function addMeta(segmentArray){
    let segmentArrayFull =[]
    let i = 1 
    let tZero = segmentArray[0][0].start.time
    
    segmentArray.forEach(seg=>{
        i++
        let dist = 0
        let path = [[parseFloat(seg[0].start.lat) , parseFloat(seg[0].start.lon) ]]
        seg.forEach (part=> {
            dist+=part.distance
            path.push([ parseFloat(part.end.lat), parseFloat(part.end.lon) ])
        })

        let props = {
            "index": Math.ceil(i/2),
            "isWave": seg[0].isWave,
            "tStamp": seg[0].start.time-tZero,
            "duration": Math.floor(seg[seg.length-1].end.time-seg[0].start.time),
            "dist": Math.floor(dist),
        }
        segmentArrayFull.push({"type": "Feature", "properties": props, "geometry": {"type": "LineString", "coordinates": path}})
    })
    return segmentArrayFull   
}
// ------------------------------------------------------------------------------------------------------------




// ---------------------------------------------------  M E T A - D A T A  ------------------------------------

function getMetaData(rawJSONData, segments) {
    let waveDist = 0
    let paddleDist = 0
    let totalDur = 0
    let waveCount = 0
    
    let longestWaveDist = {"i":0, "dist":0}
    let longestWaveDur = {"i":0, "dur":0}
    let longestPaddleDist = {"i":0, "dist":0}
    let longestPaddleDur = {"i":0, "dur":0}


    segments.forEach(seg=> {
        if (seg.properties.isWave){
            waveCount ++
            waveDist += seg.properties.dist
            if (seg.properties.dist > longestWaveDist.dist){
                longestWaveDist = {"i": seg.properties.index, "dist": seg.properties.dist}
            }
            if (seg.properties.duration > longestWaveDur.dur){
                longestWaveDur = {"i": seg.properties.index, "dur": seg.properties.duration}
            }
        }else{
            paddleDist += seg.properties.dist
            if (seg.properties.dist > longestPaddleDist.dist){
                longestPaddleDist = {"i": seg.properties.index, "dist": seg.properties.dist}
            }
            if (seg.properties.duration > longestPaddleDur.dur){
                longestPaddleDur = {"i": seg.properties.index, "dur": seg.properties.duration}
            }
        }
        totalDur += seg.properties.duration
    })
    


    return{
        "session_name": rawJSONData.session_name,
        "time": timeRead(convertUnixTime(parseTime(rawJSONData[0].timestamp))),
        "dur": totalDur,
        "waveCount": waveCount,
        "totalDist": waveDist+paddleDist,
        "paddleDist": paddleDist,
        "waveDist": waveDist,
        "longestWaveDist": longestWaveDist,
        "longestWaveDur": longestWaveDur,
        "longestPaddleDist": longestPaddleDist,
        "longestPaddleDur":longestPaddleDur
    }
}
// ------------------------------------------------------------------------------------------------------------




module.exports = {
    sessionData
}


