import React from 'react'
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const { GOOGLE_API_KEY } = process.env

class SessionMap extends React.Component {  
    constructor(props) {
        super(props)
    }
    render() {
        
    const sessionTrackPoints = this.props.sessionTrackPoints

    const POLYLINE_OPTIONS = {
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }

    const containerStyle = {
        width: '600px',
        height: '400px'
    };

    const center = sessionTrackPoints[0]


    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
                options={{
                    disableDefaultUI: true,
                    mapTypeId: 'satellite',
                    zoomControl: true,
                }}
            >
            <Polyline
                path={sessionTrackPoints}>

                </Polyline>
            </GoogleMap>
        </LoadScript>
    )
}
}

export default SessionMap