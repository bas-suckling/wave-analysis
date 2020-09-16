const createSegmentWidthArray = (segments, totalDuration) => {
    let newArray = []
    // let counter = 0
        for (let i = 0; i < segments.length; i++) {
            // counter += (segments[i].properties.duration/totalDuration)
            newArray.push((segments[i].properties.duration/totalDuration*100) + "%")
        }
    return newArray
}

module.exports = {
    createSegmentWidthArray
}