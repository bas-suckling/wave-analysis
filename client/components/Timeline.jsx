import React, { useContext, useState } from 'react'
import { store } from '../../dataStore'
import { createSegmentWidthArray } from '../helpers/timeline'
import { createInitialArrays, updateArrayElementColor } from '../helpers/mapStyles'
import WaveDataTable from './WaveDataTable'

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
                radiusArray: styleArrays.radiusArray,
                weightArray: styleArrays.weightArray,
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
        dispatch({
            type: 'setCurrentSegment',
            payload: ""
        })
    }

    return (
        <>
            <div>
                <h4>Timeline</h4>
                <div className="light-bg">
                    {sessionData.map((segment, i) => {
                        return (
                            <svg key={i} width={SEGMENT_WIDTH_ARRAY[i] + '%'} height="75">
                                <rect
                                    height="100%"
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
                <WaveDataTable />
            </div>
        </>
    )
}

export default Timeline