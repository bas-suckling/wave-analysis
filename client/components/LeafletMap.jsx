import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl, LayerGroup, LayersControl, Circle, Marker} from 'react-leaflet'
import {Icon} from "leaflet"
const { BaseLayer, Overlay } = LayersControl
import WaveDataTable from './WaveDataTable'
import { convertSeconds } from '../helpers/timeFormat'

const OPACITY = 1
const WEIGHT = 2
const RADIUS = 1
// let WAVECOLOR = '#22007c'
const WAVECOLOR = 'darkBlue'
const PADDLECOLOR = '#0d1b1e'


let play = new Icon ({
    iconUrl: "./icons/play.svg",
    iconSize: [25, 25]
})

let stop = new Icon ({
    iconUrl: "./icons/stop.svg",
    iconSize: [20, 20]
})

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

        let weightArray = []
        let colorArray = []
        let opacityArray = []
        let radiusArray = []
        let sessionTrackPoints = this.props.sessionTrackPoints

        for (let j = 0; j < sessionTrackPoints.length; j++) {
            opacityArray.push(OPACITY)
            weightArray.push(WEIGHT)
            radiusArray.push(RADIUS)
            if (sessionTrackPoints[j].properties.isWave) {
                colorArray.push(WAVECOLOR)

            } else {
                colorArray.push(PADDLECOLOR)
            }
        }

        this.state = {
            weight: weightArray,
            color: colorArray,
            opacity: opacityArray,
            radius: radiusArray,
            currentSegment: NULL_WAVE
        }
    }

    onMouseOver = (i, segment) => {
        let weightArray = this.state.weight
        let opacityArray = this.state.opacity
        let radiusArray = this.state.radius

        for (let j = 0; j < opacityArray.length; j++) {
            opacityArray[j] = 0.5;
        }
        opacityArray[i] = 1
        weightArray[i] = 4
        radiusArray[i] = 1.5
        this.setState(
            {
                weight: weightArray,
                opacity: opacityArray,
                radius: radiusArray,
                currentSegment: segment
            }
        )
    }

    onMouseOut = (i) => {
        let weightArray = this.state.weight
        let opacityArray = this.state.opacity
        let radiusArray = this.state.radius

        for (let j = 0; j < opacityArray.length; j++) {
            opacityArray[j] = OPACITY;
        }
        weightArray[i] = WEIGHT
        radiusArray[i] = RADIUS
        this.setState(
            {
                weight: weightArray,
                opacity: opacityArray,
                radius: radiusArray
            }
        )
    }
    render() {
        return (
            <>
                <Map id="mapid" center={this.props.sessionTrackPoints[Math.floor(this.props.sessionTrackPoints.length / 2)].geometry.coordinates[Math.floor(this.props.sessionTrackPoints[Math.floor(this.props.sessionTrackPoints.length / 2)].geometry.coordinates.length / 2)]} zoom={16.5} zoomSnap={0.25}>
                    <LayersControl position="topright">
                        <BaseLayer key={1} checked name="Satellite">
                            <TileLayer
                                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                maxZoom={20}
                            />
                        </BaseLayer>
                        <BaseLayer key={2} name="Street Map">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                maxNativeZoom={19}
                                maxZoom={20}>
                            </TileLayer>
                        </BaseLayer>
                        <ScaleControl updateWhenIdle={true} />
                        <Overlay name="Paddling">
                            <LayerGroup>
                                {this.props.sessionTrackPoints.map((segment, i) => {
                                    if (!segment.properties.isWave) {
                                        return (
                                            <Polyline
                                                zIndex={2}
                                                key={i}
                                                dashArray={["10 5"]}
                                                positions={segment.geometry.coordinates}
                                                color={this.state.color[i]}
                                                weight={this.state.weight[i]}
                                                opacity={this.state.opacity[i]}
                                                onMouseOver={e => this.onMouseOver(i, segment)}
                                                onMouseOut={e => this.onMouseOut(i)}
                                            >
                                                <Popup className="custom-popup">
                                                    {(segment.properties.isWave) ? "Wave" : "Paddle"} {segment.properties.index.toString()} <br />
                                                    Distance: {segment.properties.dist.toString()} meters<br />
                                                    Duration: {(segment.properties.duration / 1000).toString()} seconds<br />
                                                    Time Stamp: {convertSeconds(Math.floor(segment.properties.tStamp / 1000)).toString()}
                                                </Popup>
                                            </Polyline>
                                        )
                                    }
                                })
                                }
                            </LayerGroup>
                        </Overlay>
                        <Overlay checked name="Waves">
                            <LayerGroup>
                                {this.props.sessionTrackPoints.map((segment, i) => {
                                    if (segment.properties.isWave) {
                                        return (
                                            <div>
                                            <Polyline
                                                zIndex={3}
                                                key={i}
                                                positions={segment.geometry.coordinates}
                                                color={this.state.color[i]}
                                                weight={this.state.weight[i]}
                                                opacity={this.state.opacity[i]}
                                                onMouseOver={e => this.onMouseOver(i, segment)}
                                                onMouseOut={e => this.onMouseOut(i)}
                                            >
                                                <Popup className="custom-popup">
                                                    {(segment.properties.isWave) ? "Wave" : "Paddle"} {segment.properties.index.toString()} <br />
                                                    Distance: {segment.properties.dist.toString()} meters<br />
                                                    Duration: {(segment.properties.duration / 1000).toString()} seconds<br />
                                                    Time Stamp: {convertSeconds(Math.floor(segment.properties.tStamp / 1000)).toString()}
                                                </Popup>
                                            </Polyline>
                                            <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[0]}
                                                fillOpacity={1}
                                                fillColor="white"
                                                color={WAVECOLOR}
                                                radius={this.state.radius[i]} 
                                                onMouseOver={e => this.onMouseOver(i, segment)}
                                                onMouseOut={e => this.onMouseOut(i)}/>
                                            <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[segment.geometry.coordinates.length-1]}
                                                fillOpacity={1}
                                                fillColor="White"
                                                color={WAVECOLOR}
                                                radius={this.state.radius[i]}
                                                onMouseOver={e => this.onMouseOver(i, segment)}
                                                onMouseOut={e => this.onMouseOut(i)} 
                                            />
                                            </div>
                                        )
                                    }
                                })
                                }
                            </LayerGroup>
                        </Overlay>
                        <Overlay name="Start/Finish">
                            <LayerGroup>
                                <Marker
                                    position={this.props.sessionTrackPoints[0].geometry.coordinates[0]}
                                    icon={play}
                                />
                                <Marker
                                    position={this.props.sessionTrackPoints[this.props.sessionTrackPoints.length - 1].geometry.coordinates[this.props.sessionTrackPoints[this.props.sessionTrackPoints.length - 1].geometry.coordinates.length - 1]}
                                    icon={stop}
                                />
                            </LayerGroup>
                        </Overlay>
                    </LayersControl>
                </Map>
                {/* <WaveDataTable singleWaveData={this.state.currentSegment} /> */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </>
        )
    }
}

export default LeafletMap
