import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const {GOOGLE_API_KEY} = process.env

function SessionMap() {

    const containerStyle = {
      width: '600px',
      height: '400px'
    };
    
    const center = {
        lat: -3.745,
        lng: -38.523
      };
     
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
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