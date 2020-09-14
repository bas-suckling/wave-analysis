import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl, LayerGroup, LayersControl, Circle, Marker} from 'react-leaflet'
import {Icon} from "leaflet"
const { BaseLayer, Overlay } = LayersControl
import WaveDataTable from './WaveDataTable'
import { convertSeconds } from '../helpers/timeFormat'
import mapStyles from '../helpers/mapStyles'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        let weightArray = []
        let colorArray = []
        let opacityArray = []
        let radiusArray = []
        let segments = this.props.segments

        for (let j = 0; j < segments.length; j++) {
            opacityArray.push(mapStyles.OPACITY)
            radiusArray.push(mapStyles.RADIUS)
            if (segments[j].properties.isWave) {
                colorArray.push(mapStyles.WAVECOLOR)
                weightArray.push(mapStyles.WAVEWEIGHT)

            } else {
                colorArray.push(mapStyles.PADDLECOLOR)
                weightArray.push(mapStyles.PADDLEWEIGHT)
            }
        }

        this.state = {
            weight: weightArray,
            color: colorArray,
            opacity: opacityArray,
            radius: radiusArray,
            currentSegment: ""
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
        weightArray[i] *= 2
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
            opacityArray[j] = mapStyles.OPACITY;
            radiusArray[j] = mapStyles.RADIUS
        }
        weightArray[i] /= 2
        this.setState(
            {
                weight: weightArray,
                opacity: opacityArray,
                radius: radiusArray
            }
        )
    }
    render() {

        const startIcon = new Icon ({            
            iconUrl: "./icons/play.svg",
            iconSize: [25, 25]
        })
        
        const finishIcon = new Icon ({                
            iconUrl: "./icons/stop.svg",
            iconSize: [20, 20]
        })

        return (
            <>
                <Map id="mapid" center={this.props.segments[Math.floor(this.props.segments.length / 2)].geometry.coordinates[Math.floor(this.props.segments[Math.floor(this.props.segments.length / 2)].geometry.coordinates.length / 2)]} zoom={16.5} zoomSnap={0.25}>
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
                                {this.props.segments.map((segment, i) => {
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
                                {this.props.segments.map((segment, i) => {
                                    if (segment.properties.isWave) {
                                        return (
                                            <div key={i}>
                                            <Polyline
                                                zIndex={3}
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
                                                opacity={this.state.opacity[i]}
                                                fillOpacity={this.state.opacity[i]}
                                                fillColor="white"
                                                color={mapStyles.WAVECOLOR}
                                                radius={this.state.radius[i]} 
                                                onMouseOver={e => this.onMouseOver(i, segment)}
                                                onMouseOut={e => this.onMouseOut(i)}/>
                                            <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[segment.geometry.coordinates.length-1]}
                                                opacity={this.state.opacity[i]}
                                                fillOpacity={this.state.opacity[i]}
                                                fillColor="White"
                                                color={mapStyles.WAVECOLOR}
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
                                    position={this.props.segments[0].geometry.coordinates[0]}
                                    icon={startIcon}
                                />
                                <Marker
                                    position={this.props.segments[this.props.segments.length - 1].geometry.coordinates[this.props.segments[this.props.segments.length - 1].geometry.coordinates.length - 1]}
                                    icon={finishIcon}
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
