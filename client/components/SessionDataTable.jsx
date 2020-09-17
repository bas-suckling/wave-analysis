import React, {useContext} from 'react'
import { store } from '../../dataStore'

import {convertSeconds} from '../helpers/timeFormat'

function SessionDataTable (props) {

    const globalState = useContext(store)

    let sessionData = globalState.state.currentSession.metaData
    
         return (
            <>
            {(sessionData == undefined) ?
                <div className="loading-spinner">
                    <h4>Data loading...</h4>
                    <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
                    </div>
                </div>
                :
                <div>
                    <br/>
                    <h2>{props.sessionTitle}</h2>
                    <div className="row">
                        <div className="col-sm">
                            <h3>{sessionData.waveCount}</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{sessionData.longestWaveDist.dist} m</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{sessionData.totalDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{sessionData.waveDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{sessionData.paddleDist} km</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{sessionData.time}</h3>
                        </div>
                        <div className="col-sm">
                            <h3>{convertSeconds(Math.floor(sessionData.dur)/1000)}</h3>
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
                    </div>
            </div> }
            </>
        )
        
}

export default SessionDataTable