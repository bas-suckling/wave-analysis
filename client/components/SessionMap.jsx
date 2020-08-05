import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const {GOOGLE_API_KEY} = process.env

function SessionMap() {

    const containerStyle = {
      width: '600px',
      height: '400px'
    };

    const center = {
        lat: -41.286,
        lng: 174.776 
    }
     
  const [map, setMap] = React.useState(null)
 

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5.2}
        options={{
            disableDefaultUI: true,
            mapTypeId: 'satellite',
            zoomControl: true,
          }}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(SessionMap)