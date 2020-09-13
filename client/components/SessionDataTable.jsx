import React from 'react'
import {convertSeconds} from '../helpers/timeFormat'

class SessionDataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <div >
                    <br></br>
                    <h1>Session Analysis</h1>
                    <br></br>
                    
                    <div className="row">
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.waveCount}</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.longestWaveDist.dist}m</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.totalDist}km</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.waveDist}km</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.paddleDist}km</h2>
                        </div>
                        <div className="col-sm">
                            <h2><span style={{color:"red"}}>{this.props.sessionTableData.time}</span></h2>
                        </div>
                        <div className="col-sm">
                            <h2>{convertSeconds(Math.floor(this.props.sessionTableData.dur)/1000)}</h2>
                        </div>
                        <div className="col-sm">
                            <h2>{this.props.sessionTableData.beachDirection} deg</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <p>Waves Surfed</p>
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
                        <div className="col-sm">
                            <p>Beach Direction</p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default SessionDataTable