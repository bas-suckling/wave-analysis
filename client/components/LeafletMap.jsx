import React from 'react'
import { Map, TileLayer, Polyline, Popup, ScaleControl } from 'react-leaflet'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentSegment: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(segment) {
        this.setState({
            currentSegment: segment
        })
    }


    render() {

        const POLYLINE_PADDLE = {
            color: '#000000',
        }
        const POLYLINE_WAVE = {
            color: '#0000FF',
        }

        return (
            <>
                <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={16.5} zoomSnap={0.5}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ScaleControl updateWhenIdle={true}/>

                    {this.props.sessionTrackPoints.map((segment, i) => {
                        return (
                            <Polyline
                                ref={polyline => { this.polyline = polyline; }}
                                key={i}
                                positions={segment.geometry.coordinates}
                                color={(segment.properties.isWave == true) ? POLYLINE_WAVE.color : POLYLINE_PADDLE.color}
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
