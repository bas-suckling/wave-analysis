const TO_RAD = Math.PI/180
const TO_DEG = 180/Math.PI
const MIN_SURF_SPEED = 8
const BEACH_ANGLE_CONE = 80

function findBeachDirection(bearingArray) {
    let dirX = 0
    let dirY = 0
    let n = bearingArray.length

    bearingArray.forEach(bearing => {
        let rad = bearing*TO_RAD
        dirX+=Math.sin(rad)/n
        dirY+=Math.cos(rad)/n
    })

    beachDirection = Math.atan2(dirX,dirY) * TO_DEG
    return beachDirection
}

function setIsWave(trackPoints, beachDirection) {
    beachBearingsPack = findBearingType(beachDirection)
    // if (beachBearingsPack.insideRange){
    //     console.log("setting isWave based on:",beachBearingsPack.minAngle,"<a<",beachBearingsPack.maxAngle)
    // }else{
    //     console.log("setting isWave based on: a<",beachBearingsPack.minAngle," or ",beachBearingsPack.maxAngle,"<a")
    // }


    for (let i = 0; i < trackPoints.length-1; i++) {
        if (trackPoints[i].speed > MIN_SURF_SPEED){
            if (bearingCheck(trackPoints[i].bearing, beachBearingsPack)){
                // console.log(trackPoints[i].bearing, "passed")
                trackPoints[i].isWave = true
            // }else{
            //     console.log(trackPoints[i].bearing, "failed") 
            }
        }
    }
    return trackPoints
}



// find if bearing arc crosses the north 360->0 boundary
// returns this arc bounds ("minangle"/"maxAngle") and the rangetype "insideRange" bool
function findBearingType(beachDirection){
    var insideRange
    var minAngle
    var maxAngle
    
    if (BEACH_ANGLE_CONE <= beachDirection){
        if (beachDirection <= 360-BEACH_ANGLE_CONE){
            insideRange = true
            minAngle = beachDirection-BEACH_ANGLE_CONE
            maxAngle = beachDirection+BEACH_ANGLE_CONE
        }else{// Large Beach Dir
            insideRange = false
            minAngle = beachDirection + BEACH_ANGLE_CONE - 360
            maxAngle = beachDirection - BEACH_ANGLE_CONE
        }
    }else{// Small Beach Dir
        insideRange = false
        minAngle = beachDirection + BEACH_ANGLE_CONE
        maxAngle = beachDirection - BEACH_ANGLE_CONE + 360
    }
    console.log("normal range?",insideRange,"min",minAngle,"max",maxAngle)
    return {"insideRange": insideRange,
            "minAngle": minAngle,
            "maxAngle": maxAngle}

}

function bearingCheck(bearing,checks){
    if (checks.insideRange){
        return (checks.minAngle < bearing && bearing < checks.maxAngle)
    }
    else return (bearing < checks.minAngle   ||   checks.maxAngle < bearing)
}

module.exports = {
    findBeachDirection,
    setIsWave,
    MIN_SURF_SPEED
}