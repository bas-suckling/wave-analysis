import React from 'react'
import {convertSeconds} from '../helpers/timeFormat'

function SessionDataTable (props) {
         return (
            <>
                <div>
                    <br/>
                    <h2>{props.sessionTitle}</h2>
                    <div className="row">
                        <div className="col-sm">
                            <h3>{props.sessionTableData.waveCount}</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.longestWaveDist.dist} m</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.totalDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.waveDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.paddleDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.time}</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{convertSeconds(Math.floor(props.sessionTableData.dur)/1000)}</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{props.sessionTableData.beachDirection} deg</h3>
                        </div> 
                        <div/>
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

export default SessionDataTable