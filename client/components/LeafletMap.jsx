import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl } from 'react-leaflet'
import WaveDataTable from './WaveDataTable'
import {convertSeconds} from '../helpers/timeFormat'


const WEIGHT = 2
const OPACITY = 1
const NULL_WAVE = {
     "properties": {
         "index": "",
         "isWave": "",
         "tStamp": "",
         "duration": "",
         "dist": ""
     }
 }

//const NULL_WAVE = []
class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        let paddleColor = '#373D42'
        let waveColor = '#0000FF'
        let weightArray = []
        let colorArray = []
        let opacityArray = []
        let sessionTrackPoints = this.props.sessionTrackPoints

        for (let j = 0; j < sessionTrackPoints.length; j++) {
            weightArray.push(WEIGHT)
            opacityArray.push(OPACITY)
            if (sessionTrackPoints[j].properties.isWave) {
                colorArray.push(waveColor)
            } else {
                colorArray.push(paddleColor)
            }
        }

        this.state = {
            weight: weightArray,
            color: colorArray,
            opacity: opacityArray,
            currentSegment: NULL_WAVE
            // currentSegment: sessionTrackPoints[0
        }
    }

    onMouseOver = (i, segment) => {
        let weightArray = this.state.weight
        let opacityArray = this.state.opacity

        for (let j = 0; j < opacityArray.length; j++) {
            opacityArray[j] = 0.5;
        }
        opacityArray[i] = 1
        weightArray[i] = 4
        this.setState(
            {
                weight: weightArray,
                opacity: opacityArray,
                currentSegment: segment
            }
        )
    }

    onMouseOut = (i) => {
        let weightArray = this.state.weight
        let opacityArray = this.state.opacity
        for (let j = 0; j < opacityArray.length; j++) {
            opacityArray[j] = OPACITY;
        }
        weightArray[i] = WEIGHT
        this.setState(
            {
                weight: weightArray,
                opacity: opacityArray
            }
        )
    }

    render() {

        return (
            <>
                <Map id="mapid" center={this.props.sessionTrackPoints[0].geometry.coordinates[0]} zoom={16.5} zoomSnap={0.25}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        maxZoom={19}
                        e />
                    <ScaleControl updateWhenIdle={true} />
                    {this.props.sessionTrackPoints.map((segment, i) => {
                        return (
                            <Polyline
                                key={i}
                                positions={segment.geometry.coordinates}
                                color={this.state.color[i]}
                                weight={this.state.weight[i]}
                                opacity={this.state.opacity[i]}
                                onMouseOver={e => this.onMouseOver(i, segment)}
                                onMouseOut={e => this.onMouseOut(i)}
                            >
                                <Popup className="custom-popup">
                                    isWave: {segment.properties.isWave.toString()} <br />
                                    Distance: {segment.properties.dist.toString()} meters<br />
                                    Duration: {(segment.properties.duration / 1000).toString()} seconds<br />
                                    Wave Number: {segment.properties.index.toString()}<br />
                                    Time Stamp: {convertSeconds(Math.floor(segment.properties.tStamp / 1000)).toString()}
                                </Popup>
                            </Polyline>
                        )
                    })}
                </Map>
                <WaveDataTable singleWaveData={this.state.currentSegment} />
            </>
        )
    }
}

export default LeafletMap
