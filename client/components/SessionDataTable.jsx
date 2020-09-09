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
                            <td>Start Time:</td>
                            <td>TO BE ADDED</td>
                        </tr>
                        <tr>
                            <td>Duration:</td>
                            <td>TO BE ADDED</td>
                        </tr>
                        <tr>
                            <td>Total Waves:</td>
                            <td>{this.props.sessionTableData.waveCount}</td>
                        </tr>
                        <tr>
                            <td>Longest Wave:</td>
                            <td>Wave {this.props.sessionTableData.longestWaveDist.i} - {this.props.sessionTableData.longestWaveDist.dist} m</td>
                        </tr>
                        <tr>
                            <td>Total Distance:</td>
                            <td>{this.props.sessionTableData.totalDist} m</td>
                        </tr>
                        <tr>
                            <td>Distance Surfed:</td>
                            <td>{this.props.sessionTableData.waveDist} m</td>
                        </tr>
                        <tr>
                            <td>Distance Paddled:</td>
                            <td>{this.props.sessionTableData.paddleDist} m</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default SessionDataTable