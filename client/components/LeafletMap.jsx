import React from 'react'
import { Map, TileLayer, Polyline } from 'react-leaflet'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)
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
                <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={16}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {this.props.sessionTrackPoints.map((segment, i) => {
                        return (
                            <Polyline
                                key={i}
                                positions={segment.geometry.coordinates}
                                color={(segment.properties.isWave == true) ? POLYLINE_WAVE.color : POLYLINE_PADDLE.color}
                            />)
                    })}
                </Map>
            </>
        )
    }
}

export default LeafletMap
