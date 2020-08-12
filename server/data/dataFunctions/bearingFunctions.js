function findBeachDirection(bearingArray) {
    let dirX = 0
    let dirY = 0
    let n = bearingArray.length

    bearingArray.forEach(bearing => {
        let rad = bearing*Math.PI/180
        dirX+=Math.sin(rad)/n
        dirY+=Math.cos(rad)/n
    });

    beachDirection = Math.atan2(dirX,dirY) * 180/Math.PI

    return beachDirection
}

function setIsWave(trackPoints, beachDirection) {
    if (90 >= beachDirection >= 270){
        let angleRange = "inside360"
        let minAngle = beachDirection-90
        let maxAngle = beachDirection+90
    }
    else{
        let angleRange = "outside360"
        if (beachDirection > 270){
            let minAngle = beachDirection - 270
            let maxAngle = beachDirection - 90
        }
        else{
            let minAngle = beachDirection + 90
            let maxAngle = beachDirection + 270
        }
    }

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
}