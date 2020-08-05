import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import React from 'react'
let apiKey = process.env.API_KEY
export class SessionMap extends React.Component {
    
    render() {
        const style = {
            width: '50%',
            height: '50%'
          }
          console.log(apiKey)
        return(
            <Map 
            google={this.props.google} 
            zoom={14} 
            style={style}
            >
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : apiKey
})(SessionMap)