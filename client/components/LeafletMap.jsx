import React, { useState } from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl, LayerGroup, LayersControl, Circle, Marker } from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl
import { Icon } from "leaflet"
import { mapStyles, createInitialArrays, makeTransparent, updateArrayElement } from '../helpers/mapStyles'
import {convertSeconds} from '../helpers/timeFormat'
// import WaveDataTable from './WaveDataTable'

const LeafletMap = (props) => {

    let initialArrays = createInitialArrays(props.segments)

    const [currentStyle, setStyle] = useState(initialArrays)
    // const [currentSegment, setCurrentSegment] = useState([])

    const onMouseOver = (i, segment) => {
        // setCurrentSegment(segment)
        setStyle({
            opacityArray: makeTransparent(currentStyle.opacityArray, i),
            weightArray: updateArrayElement(currentStyle.weightArray, i, 2),
            radiusArray: updateArrayElement(currentStyle.radiusArray, i, 1.5),
            ...currentStyle
        })
    }

    const onMouseOut = () => {
        setStyle(initialArrays)
    }

    const startIcon = new Icon({
        iconUrl: "./icons/play.svg",
        iconSize: [25, 25]
    })

    const finishIcon = new Icon({
        iconUrl: "./icons/stop.svg",
        iconSize: [20, 20]
    })

    return (
        <>
            <Map id="mapid" center={props.segments[Math.floor(props.segments.length / 2)].geometry.coordinates[Math.floor(props.segments[Math.floor(props.segments.length / 2)].geometry.coordinates.length / 2)]} zoom={16.5} zoomSnap={0.25}>
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
                            {props.segments.map((segment, i) => {
                                if (!segment.properties.isWave) {
                                    return (
                                        <Polyline
                                            zIndex={2}
                                            key={i}
                                            dashArray={["10 5"]}
                                            positions={segment.geometry.coordinates}
                                            color={currentStyle.colorArray[i]}
                                            weight={currentStyle.weightArray[i]}
                                            opacity={currentStyle.opacityArray[i]}
                                            onMouseOver={() => onMouseOver(i, segment)}
                                            onMouseOut={() => onMouseOut()}
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
                            {props.segments.map((segment, i) => {
                                if (segment.properties.isWave) {
                                    return (
                                        <div key={i}>
                                            <Polyline
                                                zIndex={3}
                                                positions={segment.geometry.coordinates}
                                                color={currentStyle.colorArray[i]}
                                                weight={currentStyle.weightArray[i]}
                                                opacity={currentStyle.opacityArray[i]}
                                                onMouseOver={() => onMouseOver(i, segment)}
                                                onMouseOut={() => onMouseOut()}
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
                                                opacity={currentStyle.opacityArray[i]}
                                                fillOpacity={currentStyle.opacityArray[i]}
                                                fillColor="white"
                                                color={mapStyles.WAVECOLOR}
                                                radius={currentStyle.radiusArray[i]}
                                                onMouseOver={() => onMouseOver(i, segment)}
                                                onMouseOut={() => onMouseOut()} />
                                            <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[segment.geometry.coordinates.length - 1]}
                                                opacity={currentStyle.opacityArray[i]}
                                                fillOpacity={currentStyle.opacityArray[i]}
                                                fillColor="White"
                                                color={mapStyles.WAVECOLOR}
                                                radius={currentStyle.radiusArray[i]}
                                                onMouseOver={() => onMouseOver(i, segment)}
                                                onMouseOut={() => onMouseOut()}
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
                                position={props.segments[0].geometry.coordinates[0]}
                                icon={startIcon}
                            />
                            <Marker
                                position={props.segments[props.segments.length - 1].geometry.coordinates[props.segments[props.segments.length - 1].geometry.coordinates.length - 1]}
                                icon={finishIcon}
                            />
                        </LayerGroup>
                    </Overlay>
                </LayersControl>
            </Map>
            {/* <WaveDataTable singleWaveData={currentSegment} /> */}
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </>
    )
}

export default LeafletMap
