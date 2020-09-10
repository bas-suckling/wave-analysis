import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl, LayerGroup, LayersControl } from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl
import WaveDataTable from './WaveDataTable'
import { convertSeconds } from '../helpers/timeFormat'

const OPACITY = 1
const WEIGHT = 2

const NULL_WAVE = {
    "properties": {
        "index": "",
        "isWave": "",
        "tStamp": "",
        "duration": "",
        "dist": ""
    }
}

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        
        let paddleColor = '#0d1b1e'
        let waveColor = '#22007c'
        let weightArray = []
        let colorArray = []
        let opacityArray = []
        let sessionTrackPoints = this.props.sessionTrackPoints

        for (let j = 0; j < sessionTrackPoints.length; j++) {
            opacityArray.push(OPACITY)
            weightArray.push(WEIGHT)
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
                    <LayersControl position="topright">
                        <BaseLayer checked name="Satellite">
                            <TileLayer
                                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                        </BaseLayer>
                        <BaseLayer name="Street Map">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                maxZoom={19}>
                            </TileLayer>
                        </BaseLayer>
                        <ScaleControl updateWhenIdle={true} />
                        <Overlay checked name="Waves">
                            <LayerGroup>
                                {this.props.sessionTrackPoints.map((segment, i) => {
                                    if (segment.properties.isWave) {
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
                                    }
                                })
                            }
                            </LayerGroup>
                        </Overlay>
                        <Overlay checked name="Paddling">
                            <LayerGroup>
                                {this.props.sessionTrackPoints.map((segment, i) => {
                                    if (!segment.properties.isWave) {
                                    return (
                                        <Polyline
                                            key={i}
                                            dashArray= {["10 5"]}
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
                                    }
                                })
                            }
                            </LayerGroup>
                        </Overlay>
                    </LayersControl>
                </Map>
                <WaveDataTable singleWaveData={this.state.currentSegment} />
            </>
        )
    }
}

export default LeafletMap
