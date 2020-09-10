import React from 'react'
import {convertSeconds} from '../helpers/timeFormat'

class WaveDataTable extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
       
        
    let data = this.props.singleWaveData
        
        return (
            <>

                <table>
                    <thead>
                        <tr> 
                            <th>{(data.properties.isWave)?"Wave":"Paddle"} {data.properties.index}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Distance:</td>
                            <td>{Math.floor(data.properties.dist)} m</td>
                        </tr>
                        <tr>
                            <td>Duration:</td>
                            <td>{convertSeconds(Math.floor(data.properties.duration)/1000)}</td>
                        </tr>
                        <tr>
                            <td>Timestamp:</td>
                            <td>{convertSeconds(Math.floor(data.properties.tStamp/1000))}</td>
                        </tr>
                    </tbody>
                </table>
      
    </>
        )
    }
}

export default WaveDataTable
