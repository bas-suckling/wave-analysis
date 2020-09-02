import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl } from 'react-leaflet'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        let array = []
        let weight = 2
            for(let i = 0; i < this.props.sessionTrackPoints.length; i++) {
                array.push(weight)
            }
        
        this.state = {
            weight: array,
            paddle: {
                color:'#000000',
            },
            wave: {
                color: '#0000FF',
            }
        }
    }

    onMouseOver = (i) => {
        let weightArray = this.state.weight
        weightArray[i] = 6
        this.setState (
            {weight: weightArray}
        )
    }

    onMouseOut = (i) => {
        let weightArray = this.state.weight
        weightArray[i] = 2
        this.setState (
            {weight: weightArray}
        )
    }

    render() {         

        return (
            <>
                <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={16.5} zoomSnap={0.5}>
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
                                color={(segment.properties.isWave == true) ? this.state.wave.color : this.state.paddle.color}
                                weight={this.state.weight[i]}
                                onMouseOut={() => this.onMouseOut(i)}
                                onMouseOver={() => this.onMouseOver(i)}
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
