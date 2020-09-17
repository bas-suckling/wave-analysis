const createSegmentWidthArray = (segments, totalDuration) => {
    let newArray = []
    let counter = 0
        for (let i = 0; i < segments.length; i++) {
            let newValue = (segments[i].properties.duration/totalDuration*100)
            if (newValue < 5){
                newValue += 1
            } else if (newValue > 5) {
                newValue -= 0.5
            }
            newArray.push(newValue)
            counter += newValue
        }
    
    if (counter != 100) {
        let multiplier = 100 / counter
        for (let j = 0; j < newArray.length; j++) {
            newArray[j] *= multiplier
        }
    }

    return newArray
}

module.exports = {
    createSegmentWidthArray
}