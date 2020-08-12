

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



module.exports = {
    averageSpeed,
    setMaxSpeed
}