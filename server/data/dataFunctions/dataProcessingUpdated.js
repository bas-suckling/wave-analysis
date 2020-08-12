// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const {findBeachDirection, setIsWave} = require ('./bearingFunctions')
const {averageSpeed} = require ('./speedFunctions')

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

    processedTrackPoints = setIsWave(processedTrackPoints)
    //at this point we should have an array called processed track points, with a beach direction, and isWave set to true or false, based on the beach direction. 

    //need to add function to create session segments based on being a wave or not, as well as speed and wave summary totals

    console.log(processedTrackPoints)

    return {
        processedTrackPoints,
        totalDistance,
        beachDirection
    }
}

function createSegments (trackPointsArray) {


    
}


function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
    return MAX_SURF_SPEED
    }
}


