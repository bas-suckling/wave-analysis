import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class LeafletMap extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
    
        return (
            <>  
                  <Map id="mapid" center={[-40.7411720, 175.1104580]} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </Map>
            </>
        )
    }
}

export default LeafletMap
