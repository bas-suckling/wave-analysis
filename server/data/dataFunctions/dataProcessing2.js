// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const MAX_SURF_SPEED = 30
const MIN_SURF_SPEED = 8

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

        let speed = 3.6*(geolib.getSpeed({
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

        setMaxSpeed(speed)

        if (speed > 8) {
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
        let rad = bearing*Math.PI/180
        dirX+=Math.sin(rad)/n
        dirY+=Math.cos(rad)/n
    });

    beachDirection = Math.atan2(dirX,dirY) * 180/Math.PI

    return beachDirection
}


//
function setIsWave(trackPoints, beachDirection) {
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
        if (dataset[i].speed > MIN_SURF_SPEED && dirCheck(trackPoints[i].bearing,minAngle,maxAngle,angleRange)){
            trackPoints[i].isWave=true
        }
    }
    return trackPoints
}


function dirCheck(bearing,minAngle,maxAngle,angleRange){
    if (angleRange == "inside360"){
        return (minAngle<bearing<maxAngle)
    }
    else return (bearing<minAngle || maxAngle<bearing)
}