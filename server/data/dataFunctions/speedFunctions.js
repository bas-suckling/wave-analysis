function smoothArray(array, weight) {
    let prev = array[0].speed
    for (let i = 1; i < array.length-1; i++) {
         let average = (prev + array[i].speed*weight + array[i+1].speed)/(weight+2)
         prev = array[i].speed
         if (average >= 8){
             array[i].speed = average
         } else {
             array[i].speed = average
         }
    }
    return array
}

module.exports = {
    smoothArray,
}