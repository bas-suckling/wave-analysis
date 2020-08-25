import React from 'react'
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const { GOOGLE_API_KEY } = process.env

class SessionMap extends React.Component {  
    constructor(props) {
        super(props)
    }
    render() {
        
    const sessionTrackPoints = this.props.sessionTrackPoints

    const POLYLINE_PADDLE = {
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
      const POLYLINE_WAVE = {
        strokeColor: '#0000FF',
        strokeOpacity: 2.0,
        strokeWeight: 2
      }
    const containerStyle = {
        width: '1200px',
        height: '800px'
    };

    // const center = sessionTrackPoints[Math.floor(sessionTrackPoints.length/2)]
    const center = {
        "lat": -40.7411720,
        "lng": 175.1104580
    }

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                options={{
                    disableDefaultUI: true,
                    mapTypeId: 'satellite',
                    zoomControl: true,
                }}
            >

            {sessionTrackPoints.map((segment, i) => {
                return (
                <Polyline
                    key={i}
                    class={segment.segmentType}
                    path={segment.path}  
                    options={(segment.segmentType == 'wave' ? POLYLINE_WAVE : POLYLINE_PADDLE)}
                />)
            })}

            
            </GoogleMap>
        </LoadScript>
    )
}
}

export default SessionMap