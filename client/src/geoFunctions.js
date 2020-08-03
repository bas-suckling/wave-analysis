const geolib = require('geolib');
const moment = require('moment');

function getDataArray(data) {
    let dataArray = []
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

        dataArray.push({"originalTime" : data[i].timestamp, "parsedTime": parsedTime, "unixTime": unixTime, "elapsedTime": elapsedTime, "incrementalDistance": distanceIncrement, "cumulativeDistance": cumulativeDistance, "wSpeed": null, "pSpeed": speed, "isWave": isWave })
    }
    return dataArray 
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




function getWavesArray (array) {
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




//converts timestamp to unix time (2020-07-07 03:42:40 to 1594093360 )
function convertUnixTime(gpxTimeStamp) {
    let unixtTimeStamp = moment(gpxTimeStamp).unix()
    return unixtTimeStamp*1000 //miliseconds to seconds
}

//removes T and Z characters from gpxtimestamp(2020-07-07T03:42:40Z to 2020-07-07 03:42:40 )
function parseTime(gpxTimeStamp) {
    return gpxTimeStamp.replace(/\T/g,' ').replace(/\Z/g,'');
}

function convertHMS(sec) {
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

module.exports = {
    getDataArray,
    getWavesArray,
    averageSpeed,
}