import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl } from 'react-leaflet'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        let paddleColor = '#000000'
        let waveColor = '#0000FF'
        let weight = 2
        let opacity = 1
        let weightArray = []
        let colorArray = []
        let opacityArray = []
        let sessionTrackPoints = this.props.sessionTrackPoints

        for(let j = 0; j < sessionTrackPoints.length; j++) {
            weightArray.push(weight)
            opacityArray.push(opacity)
            if (sessionTrackPoints[j].properties.isWave) {
                colorArray.push(waveColor)
                } else {
                colorArray.push(paddleColor)
            }
        }

        this.state = {
            weight: weightArray,
            color: colorArray,
            opacity: opacityArray
        }
    }

    onMouseOver = (i) => {
        let weightArray = this.state.weight
        weightArray[i] = 6
        let opacityArray = this.state.opacity
        opacityArray[i] = 0.8
        this.setState (
            {
                weight: weightArray,
                opacity: opacityArray
            }
        )
    }

    onMouseOut = (i) => {
        let weightArray = this.state.weight
        weightArray[i] = 2
        let opacityArray = this.state.opacity
        opacityArray[i] = 1
        this.setState (
            {
                weight: weightArray,
                opacity: opacityArray
            }
        )
    }

    render() {         

        return (
            <>
                <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={16.5} zoomSnap={0.25}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        maxZoom={19}
e                    />
                    <ScaleControl updateWhenIdle={true}/>

                    {this.props.sessionTrackPoints.map((segment, i) => {
                        return (
                            <Polyline
                                key={i}
                                positions={segment.geometry.coordinates}
                                color={this.state.color[i]}
                                weight={this.state.weight[i]}
                                opacity={this.state.opacity[i]}
                                onMouseOver={e => this.onMouseOver(i)}
                                onMouseOut={e => this.onMouseOut(i)}
                                
                            >
                                <Popup>
                                    isWave: {segment.properties.isWave.toString()} <br/> 
                                    distance: {Math.floor(segment.properties.dist).toString()} meters<br/> 
                                    duration: {Math.floor((segment.properties.duration/1000)).toString()} seconds
                                </Popup>
                            </Polyline>
                        )
                    })}
                </Map>
            </>
        )
    }
}

export default LeafletMap
