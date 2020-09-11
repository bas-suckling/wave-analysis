import React from 'react'

class SessionDataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <div >
                    <h1>Session Analysis</h1>
                    <div className="row">
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.waveCount}</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.longestWaveDist.dist}m</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.totalDist}m</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.waveDist}m</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.paddleDist}m</h2>
                        </div>
                        <div className="col-sm">
                            <h2><span style={{ color: "red" }}>11am</span></h2>
                        </div>
                        <div className="col-sm">
                            <h2><span style={{ color: "red" }}>{this.props.sessionTableData.dur}</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <p>Waves</p>
                        </div>
                        <div className="col-sm">
                            <p>Longest Wave</p>
                        </div>
                        <div className="col-sm">
                            <p>Total Distance</p>
                        </div>
                        <div className="col-sm">
                            <p>Distance Surfed</p>
                        </div>
                        <div className="col-sm">
                            <p>Distance Paddled</p>
                        </div>
                        <div className="col-sm">
                            <p>Start Time</p>
                        </div>
                        <div className="col-sm">
                            <p>Duration</p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default SessionDataTable