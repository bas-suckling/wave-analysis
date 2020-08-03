import React from 'react'

class SessionDataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Session Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Waves:</td>
                            <td>{this.props.sessionData.waves}</td>
                        </tr>
                        <tr>
                            <td>Longest Wave:</td>
                            <td>{this.props.sessionData.longestWave}m</td>
                        </tr>
                        <tr>
                            <td>Max Speed:</td>
                            <td>{this.props.sessionData.maxSpeed}km/hr</td>
                        </tr>
                        <tr>
                            <td>Total Distance:</td>
                            <td>{this.props.sessionData.totalDistance}m</td>
                        </tr>
                        <tr>
                            <td>Distance Surfed:</td>
                            <td>{this.props.sessionData.distanceSurfed}m</td>
                        </tr>
                        <tr>
                            <td>Distance Paddled:</td>
                            <td>{this.props.sessionData.distancePaddled}m</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default SessionDataTable