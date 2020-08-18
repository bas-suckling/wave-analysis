const TO_RAD = Math.PI/180
const TO_DEG = 180/Math.PI
const MIN_SURF_SPEED = 8

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

    for (let i = 0; i < trackPoints.length-1; i++) {
        if (trackPoints[i].speed > MIN_SURF_SPEED   &&   bearingCheck(trackPoints[i].bearing, beachBearingsPack)){
            trackPoints[i].isWave = true
        }
    }
    return trackPoints
}



// find if bearing arc crosses the north 360->0 boundary
// returns this arc bounds ("minangle"/"maxAngle") and the rangetype "insideRange" bool
function findBearingType(beachDirection){
    if (90 >= beachDirection){
        if (beachDirection >= 270){
            let insideRange = true
            let minAngle = beachDirection-90
            let maxAngle = beachDirection+90
        }else{// >270
            let insideRange = false
            let minAngle = beachDirection - 270
            let maxAngle = beachDirection - 90
        }
    }else{// >90
        let insideRange = false
        let minAngle = beachDirection + 90
        let maxAngle = beachDirection + 270
    }
    return {"insideRange": insideRange,
            "minAngle": minAngle,
            "maxAngle": maxAngle}

}

function bearingCheck(bearing,checks){
    if (checks.insideRange){
        return (checks.minAngle < bearing < checks.maxAngle)
    }
    else return (bearing < checks.minAngle   ||   checks.maxAngle < bearing)
}

module.exports = {
    findBeachDirection,
    setIsWave,
    MIN_SURF_SPEED
}