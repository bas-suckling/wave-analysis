import React, {useState} from 'react'
import {createSegmentWidthArray} from '../helpers/timeline'
import { createInitialArrays, updateArrayElement, updateArrayElementColor } from '../helpers/mapStyles'


const Timeline = (props) => {

    let SEGMENT_WIDTH_ARRAY = createSegmentWidthArray(props.segments, props.sessionMeta.dur) 
    
    let initialArrays = createInitialArrays(props.segments)
    const [currentStyle, setStyle] = useState(initialArrays)
    const [visibility, setVisibility] = useState(true)

    const onMouseOver = (i, segment) => {
        // setCurrentSegment(segment)
        setStyle({
            weightArray: updateArrayElement(currentStyle.weightArray, i, 2),
            colorArray: updateArrayElementColor(currentStyle.colorArray, i, segment.properties.isWave),
            ...currentStyle
        })
    }

    const onMouseOut = () => {
        setStyle(initialArrays)
    }

    const handleClick = () => {
        setVisibility(!visibility)
    }

    return (
        <>
            {(visibility ? 
            <div className="light-bg">
                    {props.segments.map((segment, i) => {
                        return (
                            <svg key={i} width={SEGMENT_WIDTH_ARRAY[i]} height="75">
                                <rect   
                                    height="100%"
                                    fill={currentStyle.colorArray[i]}
                                    onMouseOver={() => onMouseOver(i, segment)}
                                    onMouseOut={() => onMouseOut()} 
                                />
                            </svg>
                        )
                    }
                    )
                }                
            </div> : 
            <br/>)}
            <p className="session-link" onClick={() => handleClick()}>Show/Hide Timeline</p>
        </>
    )
}

export default Timeline