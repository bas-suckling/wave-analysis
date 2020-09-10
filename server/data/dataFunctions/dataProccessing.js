// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, parseTime} = require('./timeConversions');
const {findBeachDirection, setIsWave, MIN_SURF_SPEED} = require ('./bearingFunctions');
const {smoothArray} = require ('./speedFunctions');

const MAX_SURF_SPEED = 30
const KMPH_CONVERT = 3.6
const MIN_SEGMENT_LENGTH = 3
const SMOOTH_WEIGHT = 4
const ACCURACY = 0.01


//--------------------------------- LOOK HERE 1st ---------------------
function sessionData(rawJSONData){
    let basicProcess = processTrackPoints(rawJSONData)                                  // (points)->(pairs); calcs; beachDirArray;
    let beachDirection = findBeachDirection(basicProcess.waveDirections)                // returns assumed dir of beach from all fast moves
    let smoothedData = smoothArray(basicProcess.processedTrackPoints, SMOOTH_WEIGHT)    // smooths all track speeds
    let finalProcess = setIsWave(smoothedData, beachDirection)                          // set pair.isWave bool for all pairs
    let segments = createSegments (finalProcess)                                        // separate data into segments
    let meta = getMetaData(rawJSONData,segments)                                        // - not currently used

    console.log('beach direction is: ', beachDirection)
    console.log('there are:', segments.length, ' segments')
    console.log(meta.waveCount, 'of which are waves')

    return({
        "meta": meta,
        "segments": segments,
        "data": finalProcess
    })
}
//---------------------------------------------------------------------

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
    })

    return{
        "session_name": rawJSONData.session_name,
        "date": rawJSONData.date,
        "dur:": totalDur,
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



function processTrackPoints(inputdata) {
    let processedTrackPoints = []
    let waveDirections = []
    
    for (let i = 0; i < inputdata.length - 1 ; i++) {

        let unixTime1 = convertUnixTime(parseTime(inputdata[i].timestamp))
        let unixTime2 = convertUnixTime(parseTime(inputdata[i+1].timestamp))
        let lat1 = inputdata[i].latitude
        let lng1 = inputdata[i].longitude
        let lat2 = inputdata[i + 1].latitude
        let lng2 = inputdata[i + 1].longitude
        let p1 = {"lat": lat1,"lon": lng1}
        let p2 = {"lat": lat2,"lon": lng2}
        
        let distanceIncrement = (geolib.getPreciseDistance(p1, p2, ACCURACY))
        
        let bearing = Math.floor(geolib.getRhumbLineBearing(p1, p2))

        let speed = KMPH_CONVERT*(geolib.getSpeed({
            "lat": lat1,
            "lon": lng1,
            "time": unixTime1
            }, 
            {
            "lat": lat2,
            "lon": lng2,
            "time": unixTime2
            }
        ))


        if (speed > MIN_SURF_SPEED) {
            speed = setMaxSpeed(speed)
            waveDirections.push(bearing)
        }

        processedTrackPoints.push({
            "unixTime1": unixTime1,
            "unixTime2": unixTime2,
            "startPoint": p1,
            "endPoint": p2,
            "distance": distanceIncrement,
            "speed": speed,
            "bearing": bearing,
            "isWave": false
        })
    }
    return {"processedTrackPoints": processedTrackPoints, "waveDirections": waveDirections}
}


// current bhvr is to join short segs to prev
function createSegments (trackPointsArray) {
    // consider split into 3 parts...
    //    part1 = initialSplit(input)
    //    part2 = combineAdj(part1)
    //    output = buildOutput(part2)
    
    
    // ---- function initial split
    let segmentArray = []
    let segment = [trackPointsArray[0]]
    for (let i = 1; i < trackPointsArray.length; i++) {
        if (trackPointsArray[i].isWave == trackPointsArray[i-1].isWave) { //if same
            segment.push(trackPointsArray[i])
        }else{
            segmentArray.push(segment) 
            segment = [trackPointsArray[i]]
        }
    }
    // ---- end function initial split




    // ---- funct combine adjacent segments (with same isWave values)
    for (let segSize = 1; segSize < MIN_SEGMENT_LENGTH; segSize++){
        let elimCounter = 0
        for (let i = 1; i < segmentArray.length-1; i++) {
            let seg = segmentArray[i]
            if (seg.length == segSize){  // combine with segs to either side
                segmentArray[i-1]=segmentArray[i-1].concat(segmentArray[i])
                segmentArray[i-1]=segmentArray[i-1].concat(segmentArray[i+1])
                segmentArray.splice(i,2)
                i--
                elimCounter++
            }
        }
        console.log(elimCounter,"segments of len", segSize, "have been removed")
    } 
    // ---- end funct combine adjacent segments (with same isWave values)

    


    // ---- funct build return array
    let segmentArrayFull =[]
    let i = 1 
    let tZero = segmentArray[0][0].unixTime1
    
    segmentArray.forEach(seg=>{
        var dist = 0
        var dur = seg[seg.length-1].unixTime2-seg[0].unixTime1
        var path = [[parseFloat(seg[0].startPoint.lat) , parseFloat(seg[0].startPoint.lon) ]]
        seg.forEach (part=> {
            path.push([
                parseFloat(part.endPoint.lat), 
                parseFloat(part.endPoint.lon)
            ])
            dist+=part.distance
        })
        let props = {
            "index": Math.ceil(i/2),
            "isWave": seg[0].isWave,
            "tStamp": seg[0].unixTime1-tZero,
            "duration": Math.floor(dur),
            "dist": Math.floor(dist),
        }
        let geom = {"type": "LineString", "coordinates": path}
        segmentArrayFull.push({"type": "Feature", "properties": props, "geometry": geom})
        i++
    })
    return segmentArrayFull
    // ---- end funct build return array   
}

function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
        return MAX_SURF_SPEED
    }
    return speed
}


module.exports = {
    sessionData
}