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
    });

    beachDirection = Math.atan2(dirX,dirY) * TO_DEG

    return beachDirection
}

function findBearingType(beachDirection){
    if (90 >= beachDirection){
        if (beachDirection >= 270){
            let angleRange = "inside360"
            let minAngle = beachDirection-90
            let maxAngle = beachDirection+90
        }else{// >270
            let angleRange = "outside360"
            let minAngle = beachDirection - 270
            let maxAngle = beachDirection - 90
        }
    }else{// >90
        let angleRange = "outside360"
        let minAngle = beachDirection + 90
        let maxAngle = beachDirection + 270
    }

}

function setIsWave(trackPoints, beachDirection) {
    

    for (let i = 0; i < trackPoints.length-1; i++) {
        if (trackPoints[i].speed > MIN_SURF_SPEED && bearingCheck(trackPoints[i].bearing,minAngle,maxAngle,angleRange)){
            trackPoints[i].isWave = true
        }
    }
    return trackPoints
}


function bearingCheck(bearing,minAngle,maxAngle,angleRange){
    if (angleRange == "inside360"){
        return (minAngle<bearing<maxAngle)
    }
    else return (bearing<minAngle || maxAngle<bearing)
}

module.exports = {
    findBeachDirection,
    setIsWave,
    MIN_SURF_SPEED
}