import React from 'react'
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
//import data from '../../server/data/rawData/tempTrackPoints.json'
import data from "../../server/data/processedData/2020-08-01_leafMapData.json"






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

                    {data.map((segment, i) => {
                        return (
                            <Polyline
                                key={i}
                                positions={segment.path}
                            />)
                    })}

                    {/* <Polyline
                    positions={data[0].path}>
                        
                    </Polyline> */}
                </Map>
            </>
        )
    }
}

export default LeafletMap
