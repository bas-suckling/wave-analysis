// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const {findBeachDirection, setIsWave, MIN_SURF_SPEED} = require ('./bearingFunctions');
const {smoothArray} = require ('./speedFunctions');

const MAX_SURF_SPEED = 30
const KMPH_CONVERT = 3.6
const MIN_SEGMENT_LENGTH = 4
const SMOOTH_WEIGHT = 1
const ACCURACY = 0.01


//--------------------------------- LOOK HERE 1st ---------------------
//
function sessionData(rawJSONData){
    let basicProcess=processTrackPoints(rawJSONData)
    let beachDirection = findBeachDirection(basicProcess.waveDirections)
    let smoothedData = smoothArray(basicProcess.processedTrackPoints, SMOOTH_WEIGHT)
    let finalProcess = setIsWave(smoothedData, beachDirection)
    let segments = createSegments (finalProcess)
    let mapData = mapReady(segments)
    let meta = getMetaData(rawJSONData,segments)

    console.log('beach direction is: ', beachDirection)
    console.log(`there are: ${segments.length} segments`)

    return({
        "meta": meta,
        "segments": segments,
        "data": finalProcess,
        "mapData": mapData
    })
}
//--------------------------------- LOOK HERE 1st ---------------------




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



function processTrackPoints(inputdata) {//main()? or basic process()?
    let processedTrackPoints = []
    let waveDirections = []
    //let totalDistance = 0

    for (let i = 0; i < inputdata.length - 1 ; i++) {

        let unixTime1 = convertUnixTime(parseTime(inputdata[i].timestamp))
        let unixTime2 = convertUnixTime(parseTime(inputdata[i+1].timestamp))
        let lat1 = inputdata[i].latitude
        let lng1 = inputdata[i].longitude
        let lat2 = inputdata[i + 1].latitude
        let lng2 = inputdata[i + 1].longitude
        let p1 = {"lat": lat1,"lon": lng1}
        let p2 = {"lat": lat2,"lon": lng2}
        
        let distanceIncrement = geolib.getPreciseDistance(p1, p2, ACCURACY)
        //totalDistance += distanceIncrement
        
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


//-------------------------------------------------------you were right this won't work corectly in a W-P-W-P-W situation
//----------------------------------------------------------instead of adding to prev, it will append to next segment! is that okay?
function createSegments (trackPointsArray) {
    let segmentArray = []
    let segment = []
    for (let i = 1; i < trackPointsArray.length; i++) {
        if (trackPointsArray[i].isWave == trackPointsArray[i-1].isWave) { //if same
            segment.push(trackPointsArray[i])
        }else{ 
            if (segment.length >= MIN_SEGMENT_LENGTH) { // if prev seg big enough (4 or more)
                segmentArray.push(segment)
                segment = [trackPointsArray[i]]
            }
            else{ // if prev seg too small
                segment.forEach(element => {
                    element.isWave = !element.isWave
                })
                segment.push(trackPointsArray[i])            
            }
        }
    }

    // combine adjacent segments with same isWave values ----------------------- NEEDS TEST!!!!!!!!!!!!!!
    for (let i = 0; i < segmentArray.length-1; i++) {
        if (segmentArray[i][0].isWave == segmentArray[i+1][0].isWave){//if i&i+1 share isWave
            segmentArray[i]=segmentArray[i].concat(segmentArray[i+1]) // concate
            segmentArray.splice(i+1,1)//remove i+1 & shorten segments len
        }
    }

    let segmentArrayFull =[]
    segmentArray.forEach(seg=>{
        //seg ID ?? use array index? 
        let isWave=seg[0].isWave
        let duration = seg[seg.length-1].time2-seg[0].time1
        let dist = 0
        seg.forEach (part=> {
            dist+=part.dist
        })
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

function mapReady(segs) {
    let segPaths = []
    segs.forEach(seg => {
        segPath = []
        segPath.push(seg.points[0].startPoint)
        seg.points.forEach(point =>{
            segPath.push(point.endPoint)
        })
        segPaths.push({"isWave": seg.isWave, "path": segPath})
    })
    return segPaths
}


module.exports = {
    sessionData
}