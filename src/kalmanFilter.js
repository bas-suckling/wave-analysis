// From: https://stackoverflow.com/questions/1134579/smooth-gps-data

class GPSKalmanFilter {
    constructor (decay = 3) {
      this.decay = decay
      this.variance = -1
      this.minAccuracy = 1
    }
  
    process (lat, lng, accuracy, timestampInMs) {
      if (accuracy < this.minAccuracy) accuracy = this.minAccuracy
  
      if (this.variance < 0) {
        this.timestampInMs = timestampInMs
        this.lat = lat
        this.lng = lng
        this.variance = accuracy * accuracy
      } else {
        const timeIncMs = timestampInMs - this.timestampInMs
  
        if (timeIncMs > 0) {
          this.variance += (timeIncMs * this.decay * this.decay) / 1000
          this.timestampInMs = timestampInMs
        }
  
        const _k = this.variance / (this.variance + (accuracy * accuracy))
        this.lat += _k * (lat - this.lat)
        this.lng += _k * (lng - this.lng)
  
        this.variance = (1 - _k) * this.variance
      }
  
      return [this.lng, this.lat]
    }
}


const kalmanFilter = new GPSKalmanFilter()
const updatedCoords = []

for (let index = 0; index < coords.length; index++) {
    const { lat, lng, accuracy, timestampInMs } = coords[index]
    updatedCoords[index] = kalmanFilter.process(lat, lng, accuracy, timestampInMs)
}

export default kalmanFilter