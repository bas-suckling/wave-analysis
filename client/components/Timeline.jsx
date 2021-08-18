import React, { useContext, useState } from 'react'
import { store } from '../../dataStore'
import { createSegmentWidthArray } from '../helpers/timeline'
import { createInitialArrays, updateArrayElementColor, updateArrayElement } from '../helpers/mapStyles'

const Timeline = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState
    const styleArrays = globalState.state.currentSession.styleArrays
    const sessionData = globalState.state.currentSession.sessionData
    const metaData = globalState.state.currentSession.metaData

    const initialArrays = createInitialArrays(sessionData)
    let SEGMENT_WIDTH_ARRAY = createSegmentWidthArray(sessionData, metaData.dur)

    const onMouseOver = (i, segment) => {
        dispatch({
            type: 'updateMapStyle',
            payload: {
                radiusArray: updateArrayElement(styleArrays.radiusArray, i, 1.5),
                weightArray: updateArrayElement(styleArrays.weightArray, i, 2),
                colorArray: updateArrayElementColor(styleArrays.colorArray, i, segment.properties.isWave)
            },
        })
        dispatch({
            type: 'setCurrentSegment',
            payload: segment
        })
    }

    const onMouseOut = () => {
        dispatch({
            type: 'setCurrentSession',
            payload: {
                styleArrays: {
                    radiusArray: initialArrays.radiusArray,
                    weightArray: initialArrays.weightArray,
                    colorArray: initialArrays.colorArray
                },
                metaData: globalState.state.currentSession.metaData,
                sessionData: sessionData
            }
        })
    }

    return (
        <>
            <div>
                <div className="timeline">
                    {sessionData.map((segment, i) => {
                        return (
                            <svg key={i} width={SEGMENT_WIDTH_ARRAY[i] + '%'} height="60">
                                <rect
                                    height="100%"
                                    width="100%"
                                    fill={styleArrays.colorArray[i]}
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