const geolib = require('geolib');
const moment = require('moment');
// const { unix } = require('moment');


function getTotalDistance(data) {
    let totalDistance = 0
    for (let i = 0; i < data.length - 1; i++) {
        let distanceIncrement = geolib.getDistance({
            "lat": data[i].latitude,
            "lon": data[i].longitude
        }, {
            "lat": data[i + 1].latitude,
            "lon": data[i + 1].longitude
        })
        totalDistance += distanceIncrement
    }
    return totalDistance
}

function getDistanceArray(data){
    let distanceArray = []
    let cumulativeDistance = 0
    for (let i = 0; i < data.length - 1 ; i++) {
        let distanceIncrement = (geolib.getDistance({
            "lat": data[i].latitude,
            "lon": data[i].longitude,
        }, {
            "lat": data[i + 1].latitude,
            "lon": data[i + 1].longitude,
        }))
        cumulativeDistance += distanceIncrement
        distanceArray.push({"time": parseTime(data[i].timestamp), "increment distance": distanceIncrement, "cumulative distance": cumulativeDistance})
    }
    return distanceArray 
}

function getSpeedArray(data) {
    let speedArray = []
    for (let i = 0; i < data.length - 1 ; i++) {
        let speed = (geolib.getSpeed({
            "lat": data[i].latitude,
            "lon": data[i].longitude,
            "time": (convertUnixTime(parseTime(data[i].timestamp)))
        }, {
            "lat": data[i + 1].latitude,
            "lon": data[i + 1].longitude,
            "time": (convertUnixTime(parseTime(data[i + 1].timestamp)))
        }))
        speedArray.push({"time": parseTime(data[i].timestamp), "speed": speed*3.6})
    }
    return speedArray
}


//converts timestamp to unix time (2020-07-07 03:42:40 to 1594093360 )
function convertUnixTime(gpxTimeStamp) {
    let unixtTimeStamp = moment(gpxTimeStamp).unix()
    return unixtTimeStamp*1000 //miliseconds to seconds
}

//removes T and Z characters from gpxtimestamp(2020-07-07T03:42:40Z to 2020-07-07 03:42:40 )
function parseTime(gpxTimeStamp) {
    return gpxTimeStamp.replace(/\T/g,' ').replace(/\Z/g,'');
}

module.exports = {
    getTotalDistance,
    getDistanceArray,
    getSpeedArray
}