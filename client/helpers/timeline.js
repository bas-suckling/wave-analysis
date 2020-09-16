const createSegmentWidthArray = (segments, totalDuration) => {
    let newArray = []
    // let counter = 0
        for (let i = 0; i < segments.length; i++) {
            let newValue = (segments[i].properties.duration/totalDuration*100)
            if (segments[i].properties.isWave){
                newValue += 0.2
            } else {
                newValue -= 0.2
            }
            newArray.push(newValue + "%")
        }
    return newArray
}

module.exports = {
    createSegmentWidthArray
}