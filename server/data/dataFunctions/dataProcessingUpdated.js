// Task 1 -> when processing .gpx file, include session_name and date into raw JSON file 
// Task 2 -> dataProcessing.js rewrite
const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const {findBeachDirection, setIsWave, MIN_SURF_SPEED} = require ('./bearingFunctions');
const {smoothArray} = require ('./speedFunctions');

const MAX_SURF_SPEED = 30
const KMPH_CONVERT = 3.6
const MIN_SEGMENT_LENGTH = 4


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

    let beachDirection = findBeachDirection(waveDirections)

    //smooth first
    let weight = 1
    processedTrackPoints = smoothArray(processedTrackPoints, weight)  //consider change var names
    processedTrackPoints = setIsWave(processedTrackPoints)
    //need to add function to create session segments based on being a wave or not, as well as speed and wave summary totals
    
    console.log(processedTrackPoints)//debug only

    return {
        processedTrackPoints,
        totalDistance,
        beachDirection
    }
}

function createSegments (trackPointsArray) {
    let segmentArray = []
    let segment = []
    for (let i = 1; i < trackPointsArray.length; i++) {
        if (trackPointsArray[i].isWave == trackpoints[i-1].isWave) { //if same
            segment.push(trackPointsArray[i])
        }else{ 
            if (segment.length > MIN_SEGMENT_LENGTH) { // if prev seg big enough (4 or more)
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

    // combine adjacent segments with same isWave values

    return segmentArray
}

function setMaxSpeed(speed) {
    if (speed > MAX_SURF_SPEED) {
        return MAX_SURF_SPEED
    }
    return speed
}