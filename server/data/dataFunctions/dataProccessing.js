const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions')

function sessionData(data) {
    let sessionDataArray = []
    let cumulativeDistance = 0 
    let startUnixTime = (convertUnixTime(parseTime(data[0].timestamp)))

    for (let i = 0; i < data.length - 1 ; i++) {
        let start = {"lat": data[i].latitude,"lon": data[i].longitude}
        let end = {"lat": data[i + 1].latitude,"lon": data[i + 1].longitude}
        let distanceIncrement = geolib.getPreciseDistance(start,end)

        //multiply speed by 3.6 to convert from m/s to km/hr 
        let speed = 3.6*(geolib.getSpeed({
            "lat": data[i].latitude,
            "lon": data[i].longitude,
            "time": (convertUnixTime(parseTime(data[i].timestamp)))
        }, {
            "lat": data[i + 1].latitude,
            "lon": data[i + 1].longitude,
            "time": (convertUnixTime(parseTime(data[i + 1].timestamp)))
        }))

        // set max speed threshold to 30km/hr
        if (speed > 30) {
            speed = 30
        }

        cumulativeDistance += distanceIncrement
        let isWave = false
        let parsedTime = parseTime(data[i].timestamp)
        let unixTime = convertUnixTime(parseTime(data[i].timestamp))
        let elapsedTime = convertHMS((unixTime - startUnixTime)/1000)

        sessionDataArray.push({"originalTime" : data[i].timestamp, "parsedTime": parsedTime, "unixTime": unixTime, "elapsedTime": elapsedTime, "incrementalDistance": distanceIncrement, "cumulativeDistance": cumulativeDistance, "wSpeed": null, "pSpeed": speed, "isWave": isWave })
    }
    return sessionDataArray 
}

// average speeds out across 3 points
function averageSpeed(array) {
    w = 1
    let prev = array[0].pSpeed
    for (let i = 1; i < array.length-1; i++) {
         let average = (prev + array[i].pSpeed*w + array[i+1].pSpeed)/(w+2)
         prev = array[i].pSpeed
         if (average >= 8){
             array[i].isWave = true
             array[i].wSpeed = average
             array[i].pSpeed = null
             
         } else {
             array[i].isWave = false
             array[i].pSpeed = average
         }
    }
    return array
}

function wavesData (array) {
    let wavesArray = []
    let wave = []

    for (let i=0; i < array.length-1; i++) {
        let datum = array[i]
        let next = array[i+1]
        if (datum.isWave) {
            wave.push(datum)
        } else {
            if (next.isWave) { //if single slow pt include in wave
                wave.push(datum)
            } 
            else {
                if (wave.length > 0) {
                    if (wave.length > 3) {
                        wavesArray.push(wave)
                    }
                    wave = []
                }
            }
        }
    }
    return wavesArray
}

module.exports = {
    sessionData,
    wavesData,
    averageSpeed,
}