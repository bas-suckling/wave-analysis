import React from 'react'

class SessionDataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        Total Waves: {this.props.sessionTableData.waveCount}
                        </div>
                        <div className="col-sm">
                        Total Distance: {this.props.sessionTableData.totalDist} m
                        </div>
                        <div className="col-sm">
                        Longest Wave: Wave {this.props.sessionTableData.longestWaveDist.i} - {this.props.sessionTableData.longestWaveDist.dist} m
                        </div>
                        <div className="col-sm">
                        Distance Surfed: {this.props.sessionTableData.waveDist} m
                        </div>
                        <div className="col-sm">
                        Distance Paddled: {this.props.sessionTableData.paddleDist} m
                        </div>
                        <div className="col-sm">
                        Start Time: TO BE ADDED
                        </div>
                        <div className="col-sm">
                        Duration: {this.props.sessionTableData.dur}
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default SessionDataTable