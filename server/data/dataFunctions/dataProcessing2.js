// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const MAX_SURF_SPEED = 30
const MIN_SURF_SPEED = 8
const KMPH_CONVERT = 3.6
const TO_RAD = Math.PI/180
const TO_DEG = 180/Math.PI

function getMetaData(rawJSONData) {
    return{
        "session_name": rawJSONData.session_name,
        "date": rawJSONData.date
    }
}

function processTrackPoints(rawJSONData) {
    let processedTrackPoints = []
    let waveDirections = []
    let totalDistance = 0

    for (let i = 0; i < rawJSONdata.length - 1 ; i++) {

        let unixTime1 = convertUnixTime(parseTime(rawJSONdata[i].timestamp))
        let unixTime2 = convertUnixTime(parseTime(rawJSONdata[i+1].timestamp))
        let lat1 = rawJSONdata[i].latitude
        let lng1 = rawJSONdata[i].longitude
        let lat2 = rawJSONdata[i + 1].latitude
        let lng2 = rawJSONdata[i + 1].longitude
        let p1 = {"lat": lat1,"lng": lng1}
        let p2 = {"lat": lat2,"lng": lng2}
        
        let distanceIncrement = geolib.getPreciseDistance(p1, p2)
        totalDistance += distanceIncrement
        
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

        speed = setMaxSpeed(speed)

        if (speed > MIN_SURF_SPEED) {
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

    let beachDirection = findBeachDirection(waveDirections)



    //smooth first
    processedTrackPoints = setIsWave(processedTrackPoints)
    //need to add function to create session segments based on being a wave or not, as well as speed and wave summary totals


    return {
        processedTrackPoints,
        totalDistance,
        beachDirection
    }
}

function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
    return MAX_SURF_SPEED
    }
}

function findBeachDirection(bearingArray) {
    let dirX = 0
    let dirY = 0
    let n = bearingArray.length

    bearingArray.forEach(bearing => {
        let rad = bearing*TO_RAD
        dirX+=Math.sin(rad)/n
        dirY+=Math.cos(rad)/n
    });

    beachDirection = Math.atan2(dirX,dirY) * TO_DEG

    return beachDirection
}


//
function setIsWave(trackPoints, beachDirection) { //not perfectly factored but more reader friendly    do you want to swap magic number for consts?
    if (90 >= beachDirection >= 270){
        let angleRange = "inside360"
        let minAngle = beachDirection-90
        let maxAngle = beachDirection+90
    }
    else{
        let angleRange = "outside360"
        if (beachDirection > 270){
            let minAngle = beachDirection - 270
            let maxAngle = beachDirection - 90
        }
        else{
            let minAngle = beachDirection + 90
            let maxAngle = beachDirection + 270
        }
    }

    for (let i = 0; i < trackPoints.length-1; i++) {
        if (trackPoints[i].speed > MIN_SURF_SPEED && bearingCheck(trackPoints[i].bearing,minAngle,maxAngle,angleRange)){
            trackPoints[i].isWave=true
        }
    }
    return trackPoints
}


function bearingCheck(bearing,minAngle,maxAngle,angleRange){//var names not intuitive for "outside case"?
    if (angleRange == "inside360"){
        return (minAngle<bearing<maxAngle)
    }
    else return (bearing<minAngle || maxAngle<bearing)
}