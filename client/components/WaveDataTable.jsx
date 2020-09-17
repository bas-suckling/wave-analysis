import React from 'react'
import { convertSeconds } from '../helpers/timeFormat'

const WaveDataTable = (props) => {
    console.log('props', props)

    return (
        <>  {(props.currentSegment != "") ?

            <div className="row">
                <div className="col-2">
                    <h6>{(props.currentSegment.properties.isWave) ? "Wave" : "Paddle"} {props.currentSegment.properties.index}</h6>
                </div>
                <div className="col-2">
                    <h6>Distance: {Math.floor(props.currentSegment.properties.dist)} m</h6>
                </div>
                <div className="col-2">
                    <h6>Duration: {convertSeconds(Math.floor(props.currentSegment.properties.duration) / 1000)}</h6>
                </div>
                <div className="col-2">
                    <h6>TimeStamp: {convertSeconds(Math.floor(props.currentSegment.properties.tStamp / 1000))}</h6>
                </div>

            </div> :
            <div className="row"></div>
        }

        </>
    )

}

export default WaveDataTable
