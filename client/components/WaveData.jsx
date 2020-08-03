import React from 'react'

class WaveDataTable extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>TEMPORARY Wave {this.props.singleWaveData.wave_id} Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Distance:</td>
                            <td>{this.props.singleWaveData.distanceSurfed}m</td>
                        </tr>
                        <tr>
                            <td>Max Speed:</td>
                            <td>{this.props.singleWaveData.maxSpeed}km/hr</td>
                        </tr>
                        <tr>
                            <td>Timestamp:</td>
                            <td>{this.props.singleWaveData.timeStamp}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default WaveDataTable
