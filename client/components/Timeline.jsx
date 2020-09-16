import React from 'react'
import {createSegmentWidthArray} from '../helpers/timeline'

const Timeline = (props) => {

    let SEGMENT_WIDTH_ARRAY = createSegmentWidthArray(props.segments, props.sessionMeta.dur) 
    
    let waveColor = "#2c3e50"
    let paddleColor = "#252525"

    return (
        <>
            <div className="container-fluid">
                <br/>
                <div className="row">
                    {props.segments.map((segment, i) => {
                        return (
                            <svg width={SEGMENT_WIDTH_ARRAY[i]} height="100">
                                <rect key={segment[i]} width='100%' height="100" fill={(segment.properties.isWave) ? waveColor : paddleColor } />
                            </svg>
                        )
                    }
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default Timeline