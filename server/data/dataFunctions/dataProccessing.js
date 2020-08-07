const geolib = require('geolib');
const {convertUnixTime, convertHMS, parseTime} = require('./timeConversions');
const { SingleEntryPlugin } = require('webpack');

const MAX_SURF_SPEED = 30
const MIN_WAVE_SPEED = 8
const MIN_WAVE_LEN = 3

// prelim data processing
// find beach direction; and also dist,speed and direction for each data point
// takes raw GPX as input and outputs... 
//    #1 shore direction as a bearing from North, 
//    2# preprocessed data array {time,orig,dest,dist,speed,dir}
function dataPreProcessing(raw) {
    let ppData = []     //output array
    let waveDirections = [] 

    for (let i = 0; i < raw.length - 1 ; i++) {
        let uTime1 = convertUnixTime(parseTime(raw[i].timestamp))
        let uTime2 = convertUnixTime(parseTime(raw[i+1].timestamp))
        let p1 = {"lat": raw[i].latitude,"lon": raw[i].longitude}
        let p2 = {"lat": raw[i + 1].latitude,"lon": raw[i + 1].longitude}
        
        let distanceIncrement = geolib.getPreciseDistance(p1,p2)
        let speed = 3.6*(geolib.getSpeed({"lat": raw[i].latitude,"lon": raw[i].longitude,"time": uTime1}, {"lat": raw[i + 1].latitude,"lon": raw[i + 1].longitude,"time": uTime2}))
        if (speed > MAX_SURF_SPEED) {speed = MAX_SURF_SPEED}
        let dir = getCompassDirection(p1, p2)

        // include a isWave = null?
        ppData.push({"uTime" : uTime1, "sPoint": p1, "ePoint": p2, "dist": distanceIncrement,  "speed": speed, "dir": dir})

        if (speed > MIN_WAVE_SPEED) {
            waveDirections.push(dir)
        }
    }
    // find beach // check by drawing an arrow on yo map son (potential future option to confirm wave direction by rotating arrow)
    let dirX = 0
    let dirY = 0
    let n = waveDirections.length
    waveDirections.forEach(dir => {
        let rad = dir*Math.PI/180
        dirX+=Math.sin(rad)/n
        dirY+=Math.cos(rad)/n
    });
    beachDirection = Math.atan2(dirX,dirY) * 180/Math.PI
    return [beachDirection, ppData]
}

function smoothData(dataset,w) {  //1st and last pt unchanged // higher w is less smoothened
    let prev = dataset[0].speed
    for (let i = 1; i < dataset.length-2; i++) {
         let average = (prev + dataset[i].speed*w + dataset[i+1].speed)/(w+2)
         prev = dataset[i].speed
         dataset[i].speed = average
    }
    return dataset
}



// helper func to tidy up untidiness caused by 0-360 confusion
function dirCheck(dir,low,high,inOrOut){
    if (inOrOut == "i"){ //decides wheter you are check if value is between our outside of
        return (low<dir<high) //not sure if you are allowed to chain together like this in js
    }
    else return (dir<low || high<dir)
}


//should be after/during smooth could be combined up or down
function wavify(dataset,threshold,wDir) {
    if (90<=wDir){
        if (wDir<=270){
            type = "i"
            low = wDir-90
            high = wDir+90
        }else{ //beach dir > 270 deg
            type = "o"
            low = wDir-270
            high = wDir-90
        }
    }
    else{//beach dir < 90 deg
        type = "o"
        low = wDir+90
        high = wDir+270
    }

    for (let i = 0; i < dataset.length-1; i++) {
        if (dataset[i].speed>threshold && dirCheck(dataset[i].dir,low,high,type)){
            dataset[i].isWave=true
        }
        else{
            dataset[i].isWave = false
        }
    }
    return dataset // consider also returning a "wave/total" as either totals or ratio
}


function waveFinding(waveDir, Data) {
    let wave = []
    let paddle = []
    let waves = []
    let paddles = []

    for (let i = 0; i < data.length - 1 ; i++) {
        let datum = array[i]
        let next = array[i+1]
        if (datum.isWave) {
            if (paddle.length>0){
                paddles.push(paddle)
                paddle = []
            }
            wave.push(datum)
        } else {
            if (wave.length>1 && next.isWave==true) { //if single slow pt include in wave  // do these still exist //try 0 in place of 1?
                wave.push(datum)
            } 
            else {
                if (wave.length > 0) {
                    if (wave.length > MIN_WAVE_LEN) {
                        waves.push(wave)
                    }
                    paddles[paddles.length-1]=paddles[paddles.length-1].concat(wave) //if wave is too short add it to the last paddle
                    wave = []
                }
                paddle.push(datum)
            }
        }
    }
    return [waves,paddles]
}

function processSegments(segments){
    waves=segment[0]
    paddles=segments[1]
    //process segments and create segment object
    //return segment array
}




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