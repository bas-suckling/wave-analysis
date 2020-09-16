
// defaults
// - OPACITY = 1        - PADDLEWEIGHT = 1.5        - WAVEWEIGHT = 3
// - RADIUS = 1         - WAVECOLOR = '#2c3e50'      - PADDLECOLOR = '#252525'

const mapStyles = {
    "PADDLEWEIGHT": 1.5 ,
    "WAVEWEIGHT": 3,
    "RADIUS": 1,
    "WAVECOLOR": '#2c3e50' ,
    "PADDLECOLOR": '#252525',
    "HIGHLIGHTWAVE": 'lightSkyBlue',
    "HIGHLIGHTPADDLE": "black"
}

function createInitialArrays(dataArray) {

    let radiusArray = []
    let colorArray = []
    let weightArray = []

    for (let i = 0; i < dataArray.length; i++) {
        radiusArray.push(mapStyles.RADIUS)
        if (dataArray[i].properties.isWave) {
            colorArray.push(mapStyles.WAVECOLOR)
            weightArray.push(mapStyles.WAVEWEIGHT)

        } else {
            colorArray.push(mapStyles.PADDLECOLOR)
            weightArray.push(mapStyles.PADDLEWEIGHT)
        }
    }

    return {
        radiusArray,
        colorArray,
        weightArray
    }
}

function updateArrayElement(array, index, value) {
    let newArray = array
    newArray[index] *= value
    return newArray  
}

function updateArrayElementColor(array, index, isWave) {
    let newArray = array
    if (isWave == true) {
        newArray[index] = mapStyles.HIGHLIGHTWAVE
    } else {
        newArray[index] = mapStyles.HIGHLIGHTPADDLE
    }
    return newArray 
}

module.exports = {
    mapStyles,
    createInitialArrays,
    updateArrayElement,
    updateArrayElementColor
}