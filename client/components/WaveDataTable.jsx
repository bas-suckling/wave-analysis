import React, {useContext} from 'react'
import { convertSeconds } from '../helpers/timeFormat'
import { store } from '../../dataStore'


const WaveDataTable = () => {

    const globalState = useContext(store)

    const currentSegment = globalState.state.currentSegment

    return (
        <>  

            <div className="row">
                <div className="col-2">
                    <h6>{(currentSegment != "") ? ((currentSegment.properties.isWave) ? `Wave ${currentSegment.properties.index}` : `Paddle ${currentSegment.properties.index}`) : 'Current Segment'}</h6>
                </div>
                <div className="col-2">
                    <h6>Distance: {(currentSegment != "") ? Math.floor(currentSegment.properties.dist) : ""} m</h6>
                </div>
                <div className="col-2">
                    <h6>Duration: {(currentSegment != "") ? convertSeconds(Math.floor(currentSegment.properties.duration) / 1000) : ""}</h6>
                </div>
                <div className="col-2">
                    <h6>TimeStamp: {(currentSegment != "") ? convertSeconds(Math.floor(currentSegment.properties.tStamp / 1000)) : ""}</h6>
                </div>
            </div> 
            <div className="row"></div>
        </>
    )

}

export default WaveDataTable
