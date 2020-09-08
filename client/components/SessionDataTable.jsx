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
                            <td>{this.props.sessionTableData.waves}</td>
                        </tr>
                        <tr>
                            <td>Longest Wave:</td>
                            <td>{this.props.sessionTableData.longestWave} m</td>
                        </tr>
                        <tr>
                            <td>Total Distance:</td>
                            <td>{this.props.sessionTableData.totalDistance} m</td>
                        </tr>
                        <tr>
                            <td>Distance Surfed:</td>
                            <td>{this.props.sessionTableData.distanceSurfed} m</td>
                        </tr>
                        <tr>
                            <td>Distance Paddled:</td>
                            <td>{this.props.sessionTableData.distancePaddled} m</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default SessionDataTable