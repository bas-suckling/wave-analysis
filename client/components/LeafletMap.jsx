import React, { useContext } from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl, LayerGroup, LayersControl, Circle, Marker } from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl
import { Icon } from "leaflet"
import { createInitialArrays, updateArrayElement, updateArrayElementColor } from '../helpers/mapStyles'
import {convertSeconds} from '../helpers/timeFormat'
// import WaveDataTable from './WaveDataTable'

import { store } from '../../dataStore'

const LeafletMap = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState

    const segments = globalState.state.currentSession.sessionData
    const metaData = globalState.state.currentSession.metaData
    const styleArrays = globalState.state.currentSession.styleArrays
    const initialArrays = createInitialArrays(segments)


    const bringToFront = (target) => {
        target.bringToFront();
      }

    const onMouseOver = (i, segment, e) => {
        bringToFront(e.target)
        dispatch({
            type:'updateMapStyle',
            payload: {
                    radiusArray: updateArrayElement(styleArrays.radiusArray, i, 1.5),
                    weightArray: updateArrayElement(styleArrays.weightArray, i, 2),
                    colorArray: updateArrayElementColor(styleArrays.colorArray, i, segment.properties.isWave)
                },
            }
        )
        dispatch({
            type: 'setCurrentSegment',
            payload: segment
        })
    }

    const onMouseOut = () => {
        dispatch({
            type: 'setCurrentSession',
            payload: {
                styleArrays:{
                radiusArray: initialArrays.radiusArray,
                weightArray: initialArrays.weightArray,
                colorArray: initialArrays.colorArray},
                metaData: metaData,
                sessionData: segments
            }
        })
        // dispatch({
        //     type:'setCurrentSegment',
        //     payload: ""
        // })
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
         {(globalState.state.currentSession == undefined || styleArrays.colorArray.length < 2) ?
                <div className="loading-spinner">
                    <h4>Data loading...</h4>
                    <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
                    </div>
                </div>
                :
            <Map id="mapid" center={segments[Math.floor(segments.length / 2)].geometry.coordinates[Math.floor(segments[Math.floor(segments.length / 2)].geometry.coordinates.length / 2)]} zoom={17.5} zoomSnap={0.25}>
                <LayersControl position="bottomright" >
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
                            {segments.map((segment, i) => {
                                if (!segment.properties.isWave) {
                                    return (
                                        <Polyline
                                            zIndex={2}
                                            key={i}
                                            dashArray={["10 5"]}
                                            positions={segment.geometry.coordinates}
                                            color={styleArrays.colorArray[i]}
                                            weight={styleArrays.weightArray[i]}
                                            onMouseOver={(e) => onMouseOver(i, segment, e)}
                                            onMouseOut={() => onMouseOut()}
                                        >
                                            <Popup className="custom-popup-paddle">
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
                            {segments.map((segment, i) => {
                                if (segment.properties.isWave) {
                                    return (
                                        <div key={i}>
                                            <Polyline
                                                zIndex={4}
                                                positions={segment.geometry.coordinates}
                                                color={styleArrays.colorArray[i]}
                                                weight={styleArrays.weightArray[i]}
                                                onMouseOver={(e) => onMouseOver(i, segment, e)}
                                                onMouseOut={() => onMouseOut()}
                                            >
                                                <Popup className="custom-popup-wave">
                                                    {(segment.properties.isWave) ? "Wave" : "Paddle"} {segment.properties.index.toString()} <br />
                                                    Distance: {segment.properties.dist.toString()} meters<br />
                                                    Duration: {(segment.properties.duration / 1000).toString()} seconds<br />
                                                    Time Stamp: {convertSeconds(Math.floor(segment.properties.tStamp / 1000)).toString()}
                                                </Popup>
                                            </Polyline>
                                            {/* <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[0]}
                                                fillOpacity={1}
                                                fillColor="white"
                                                color={styleArrays.colorArray[i]}
                                                radius={styleArrays.radiusArray[i]}
                                                onMouseOver={(e) => onMouseOver(i, segment, e)}
                                                onMouseOut={() => onMouseOut()} />
                                            <Circle
                                                zIndex={4}
                                                center={segment.geometry.coordinates[segment.geometry.coordinates.length - 1]}
                                                fillOpacity={1}
                                                fillColor="White"
                                                color={styleArrays.colorArray[i]}
                                                radius={styleArrays.radiusArray[i]}
                                                onMouseOver={(e) => onMouseOver(i, segment, e)}
                                                onMouseOut={() => onMouseOut()}
                                            /> */}
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
                                position={segments[0].geometry.coordinates[0]}
                                icon={startIcon}
                            />
                            <Marker
                                position={segments[segments.length - 1].geometry.coordinates[segments[segments.length - 1].geometry.coordinates.length - 1]}
                                icon={finishIcon}
                            />
                        </LayerGroup>
                    </Overlay>
                </LayersControl>
            </Map>
            }
            {/* <WaveDataTable singleWaveData={currentSegment} /> */}
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </>
        
    )
}

export default LeafletMap
