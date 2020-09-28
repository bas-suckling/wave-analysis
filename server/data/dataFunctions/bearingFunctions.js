const TO_RAD = Math.PI/180
const TO_DEG = 180/Math.PI
const MIN_SURF_SPEED = 8
const BEACH_ANGLE_CONE = 50

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
    if (beachDirection < 0){
        beachDirection += 360
    }
    return Math.ceil(beachDirection)
}

function setIsWave(trackPoints, beachDirection) {
    beachBearingsPack = findBearingType(beachDirection)

    for (let i = 0; i < trackPoints.length-1; i++) {
        if (trackPoints[i].speed > MIN_SURF_SPEED){
            if (bearingCheck(trackPoints[i].bearing, beachBearingsPack)){
                trackPoints[i].isWave = true
            }
        }
    }
    return trackPoints
}



// find if bearing arc crosses the north 360->0 boundary
// returns this, arc bounds ("minangle"/"maxAngle"), and the rangetype "insideRange" bool
function findBearingType(beachDirection){
    let insideRange
    let minAngle
    let maxAngle
    
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


function endPoint(start,brng){
    brng *= TO_RAD

    const R = 6371000000    // earth Radius
    const d = 100            // line dist
    let lat1 = start[0]*TO_RAD
    let lon1 = start[1]*TO_RAD

    let a = Math.sin(lat1)*Math.cos(d/R)
    let b = Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng)
    let lat2 = Math.asin( a + b )*TO_DEG
    //console.log("lat1:",start[0],"lat2:",lat2)
    

    let e = Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1)
    let f = Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2)
    let lon2 = (lon1 + Math.atan2( e , f ))*TO_DEG
    //console.log("lon1:",start[1],"lon2:",lon2)

    return ([lat2,lon2])
}


module.exports = {
    findBeachDirection,
    setIsWave,
    endPoint,
    MIN_SURF_SPEED
}