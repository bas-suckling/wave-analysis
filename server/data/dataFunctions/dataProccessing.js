// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, parseTime} = require('./timeConversions');
const {findBeachDirection, setIsWave, MIN_SURF_SPEED} = require ('./bearingFunctions');
const {smoothArray} = require ('./speedFunctions');

const MAX_SURF_SPEED = 30
const KMPH_CONVERT = 3.6
const MIN_SEGMENT_LENGTH = 4
const SMOOTH_WEIGHT = 4
const ACCURACY = 0.01


//--------------------------------- LOOK HERE 1st ---------------------
function sessionData(rawJSONData){
    let basicProcess = processTrackPoints(rawJSONData)                                  // (points)->(pairs); calcs; beachDirArray;
    let beachDirection = findBeachDirection(basicProcess.waveDirections)                // returns assumed dir of beach from all fast moves
    let smoothedData = smoothArray(basicProcess.processedTrackPoints, SMOOTH_WEIGHT)    // smooths all track speeds
    let finalProcess = setIsWave(smoothedData, beachDirection)                          // set pair.isWave bool for all pairs
    let segments = createSegments (finalProcess)                                        // separate data into segments
    let mapData = mapReady(segments)                                                    // get segments into map format
    let meta = getMetaData(rawJSONData,segments)                                        // - not currently used

    console.log('beach direction is: ', beachDirection)
    console.log(`there are: ${segments.length} segments`)

    return({
        "meta": meta,
        "segments": segments,
        "data": finalProcess,
        "mapData": mapData
    })
}
//---------------------------------------------------------------------


function getMetaData(rawJSONData, segments) {
    totalDist = 0
    totalDur = 0
    waveCount = 0
    segments.forEach(seg=> {
        totalDist+=seg.dist
        totalDur+=seg.duration
        if (seg.isWave){
            waveCount+=1
        }
    })

    return{
        "session_name": rawJSONData.session_name,
        "date": rawJSONData.date,
        //"locationName":(lookup??),
        "waveCount": waveCount,
        "totalDist": totalDist,
        "totalDur:": totalDur
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
    //console.log(processedTrackPoints)//debug only?
    return {"processedTrackPoints": processedTrackPoints, "waveDirections": waveDirections}
}


// joins short segs to prev
function createSegments (trackPointsArray) {
    let segmentArray = []
    
    //manually build first seg
    let segment = [trackPointsArray[0]]
    let segType = trackPointsArray[0].isWave
    let j = 1
    while (trackPointsArray[j] == segType){
        segment.push(trackPointsArray[j])
        j++
    }
    segmentArray.push(segment)

    for (let i = j; i < trackPointsArray.length; i++) {
        if (trackPointsArray[i].isWave == trackPointsArray[i-1].isWave) { //if same
            segment.push(trackPointsArray[i])
        }else{ 
            if (segment.length >= MIN_SEGMENT_LENGTH) { // if prev seg big enough (4 or more)
                segmentArray.push(segment)
                segment = [trackPointsArray[i]]
            }
            else{ // if prev seg too small flip ".isWave" and push to segments (effectively "add to last segment")
                segment.forEach(element => {
                    element.isWave = !element.isWave
                })
                segmentArray.push(segment)
                segment=[trackPointsArray[i]]       //reset segment      
            }
        }
    }

    // combine adjacent segments with same isWave values ----------------------- NEEDS TEST!!!!!!!!!!!!!!
    for (let i = 0; i < segmentArray.length-1; i++) {
        if (segmentArray[i][0].isWave == segmentArray[i+1][0].isWave){//if i&i+1 share isWave
            segmentArray[i]=segmentArray[i].concat(segmentArray[i+1]) // concate
            segmentArray.splice(i+1,1)//remove i+1 & shorten segments len
            i-- // retest combined segment against next
        }
    }

    let segmentArrayFull =[]
    segmentArray.forEach(seg=>{
        let isWave=seg[0].isWave
        let duration = seg[seg.length-1].unixTime2-seg[0].unixTime1  // convert to seconds
        var dist = 0
        seg.forEach (part=> {
            dist+=part.distance
        })
        //console.log("Segment duration: ",duration," distance: ",dist)
        segmentArrayFull.push({
            "isWave": isWave,
            "duration": duration,
            "dist": dist,
            "points": seg
        })
       })
    return segmentArrayFull
}

function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
        return MAX_SURF_SPEED
    }
    return speed
}

function toLng(raw) {
    return {"lat": parseFloat(raw.lat), "lng": parseFloat(raw.lon)}
}
function mapReady(segs) {
    let segPaths = []
    segs.forEach(seg => {
        segPath = []
        
        segPath.push(toLng(seg.points[0].startPoint))
        seg.points.forEach(point =>{
            segPath.push(toLng(point.endPoint))
        }) 

        let segmentType = "paddle"
        if (seg.isWave) {
            segmentType = "wave" 
        }
        
        segPaths.push({"segmentType": segmentType, "path": segPath})
    })
    return segPaths
}

module.exports = {
    sessionData
}