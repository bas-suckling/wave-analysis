const geolib = require('geolib');
const moment = require('moment');
const { unix } = require('moment');

function getTotalDistance(data) {
    let totalDistance = 0
    for (let i = 0; i < data.length - 1; i++) {
        let distanceIncrement = geolib.getDistance({
            "latitude": data[i].latitude,
            "longitude": data[i].longitude
        }, {
            "latitude": data[i + 1].latitude,
            "longitude": data[i + 1].longitude
        })
        totalDistance += distanceIncrement
    }
    return totalDistance
}

function getSpeedArray(data) {
    let speedArray = []
    for (let i = 0; i < data.length - 1 ; i++) {
        let speed = (geolib.getSpeed({
            "lat": data[i].latitude,
            "lon": data[i].longitude,
            "time": (convertUnixTime(data[i].timestamp))
        }, {
            "lat": data[i + 1].latitude,
            "lon": data[i + 1].longitude,
            "time": (convertUnixTime(data[i + 1].timestamp))
        }))
        speedArray.push(speed)
    }
    return speedArray
}


//converts gpx timestamp to unix time (2020-07-07T03:42:40Z to )
function convertUnixTime(gpxTimeStamp) {
    let timeStamp = gpxTimeStamp.replace(/\T/g,' ').replace(/\Z/g,'');
    let unixtTimeStamp = moment(timeStamp).unix()
    return unixtTimeStamp*1000 //miliseconds to seconds
}

module.exports = {
    getTotalDistance,
    getSpeedArray
}