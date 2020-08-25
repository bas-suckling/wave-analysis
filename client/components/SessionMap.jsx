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
        width: '1200px',
        height: '800px'
    };

    // const center = sessionTrackPoints[Math.floor(sessionTrackPoints.length/2)]

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                // center={center}
                zoom={16}
                options={{
                    disableDefaultUI: true,
                    mapTypeId: 'satellite',
                    zoomControl: true,
                }}
            >

            {sessionTrackPoints.map((segment, i) => {
                return <>
                <Polyline
                    key={i}
                    class={segment.isWave}
                    path={segment.path}
                />
                </>
            })}


            {/* for each seg{ create array of points {lat,lng} for segment and dray polyline (alt colors**)  */}
            {/* <Polyline
                class={segment.isWave}
                path={segPath}>
            </Polyline> */}
            
            </GoogleMap>
        </LoadScript>
    )
}
}

export default SessionMap