
// defaults
// - OPACITY = 1        - PADDLEWEIGHT = 1.5        - WAVEWEIGHT = 3
// - RADIUS = 1         - WAVECOLOR = '#2c3e50'      - PADDLECOLOR = '#252525'

const mapStyles = {
    "OPACITY": 1,
    "PADDLEWEIGHT": 1.5 ,
    "WAVEWEIGHT": 3,
    "RADIUS": 1,
    "WAVECOLOR": '#2c3e50' ,
    "PADDLECOLOR": '#252525'
}

function createInitialArrays(dataArray) {

    let opacityArray = []
    let radiusArray = []
    let colorArray = []
    let weightArray = []

    for (let i = 0; i < dataArray.length; i++) {
        opacityArray.push(mapStyles.OPACITY)
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
        opacityArray,
        radiusArray,
        colorArray,
        weightArray
    }
}

function makeTransparent(opacityArray, i) {
    let array = []
    for (let i = 0; i < opacityArray.length; i++) {
        array.push(0.5);
    }
    array[i] = 1
    return array
}

function updateArrayElement(array, index, value) {
    let newArray = array
    newArray[index] *= value
    return newArray  
}

module.exports = {
    mapStyles,
    createInitialArrays,
    makeTransparent,
    updateArrayElement 
}