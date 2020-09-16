import React, {useState} from 'react'
import {createSegmentWidthArray} from '../helpers/timeline'
import { createInitialArrays, updateArrayElement, updateArrayElementColor } from '../helpers/mapStyles'


const Timeline = (props) => {

    let SEGMENT_WIDTH_ARRAY = createSegmentWidthArray(props.segments, props.sessionMeta.dur) 
    
    let initialArrays = createInitialArrays(props.segments)
    const [currentStyle, setStyle] = useState(initialArrays)

    const onMouseOver = (i, segment) => {
        // setCurrentSegment(segment)
        setStyle({
            radiusArray: updateArrayElement(currentStyle.radiusArray, i, 1.5),
            weightArray: updateArrayElement(currentStyle.weightArray, i, 2),
            colorArray: updateArrayElementColor(currentStyle.colorArray, i, segment.properties.isWave),
            ...currentStyle
        })
    }

    const onMouseOut = () => {
        setStyle(initialArrays)
    }

    return (
        <>
            <div className="container-fluid">
                <br/>
                <div className="row">
                    {props.segments.map((segment, i) => {
                        return (
                            <svg width={SEGMENT_WIDTH_ARRAY[i]} height="100">
                                <rect 
                                    key={segment[i]}
                                    width='100%'
                                    height="100"
                                    fill={currentStyle.colorArray[i]}
                                    onMouseOver={() => onMouseOver(i, segment)}
                                    onMouseOut={() => onMouseOut()} 
                                />
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