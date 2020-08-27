import React from 'react'
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet'
import data from '../../server/data/rawData/tempTrackPoints.json'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
    
        return (
            <>  
                  <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={16}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Polyline
                    positions={data}>
                        
                    </Polyline>
                  </Map>
            </>
        )
    }
}

export default LeafletMap
