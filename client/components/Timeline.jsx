import React, {useContext, useState} from 'react'
import {store} from '../../dataStore'
import {createSegmentWidthArray} from '../helpers/timeline'
import { createInitialArrays, updateArrayElement, updateArrayElementColor } from '../helpers/mapStyles'


const Timeline = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState
    const initialArrays = createInitialArrays(globalState.state.currentSession.sessionData)

    let SEGMENT_WIDTH_ARRAY = createSegmentWidthArray(globalState.state.currentSession.sessionData, globalState.state.currentSession.metaData.dur) 
    
    // const [currentStyle, setStyle] = useState(initialArrays)
    const [visibility, setVisibility] = useState(true)

    const onMouseOver = (i, segment) => {
        dispatch({
            type:'updateMapStyles',
            payload: {
                    radiusArray: globalState.state.currentSession.styleArrays.radiusArray,
                    weightArray: globalState.state.currentSession.styleArrays.weightArray,
                    colorArray: updateArrayElementColor(globalState.state.currentSession.styleArrays.colorArray, i, segment.properties.isWave)
                },
            }
        )
    }

    const onMouseOut = () => {
        dispatch({
            type: 'setCurrentSession',
            payload: {
                styleArrays:{
                radiusArray: initialArrays.radiusArray,
                weightArray: initialArrays.weightArray,
                colorArray: initialArrays.colorArray},
                metaData: globalState.state.currentSession.metaData,
                sessionData: globalState.state.currentSession.sessionData
            }
        })
    }

    const handleClick = () => {
        setVisibility(!visibility)
    }

    return (
        <>
            {(visibility ? 
            <div className="light-bg">
                    {globalState.state.currentSession.sessionData.map((segment, i) => {
                        return (
                            <svg key={i} width={SEGMENT_WIDTH_ARRAY[i] + '%'} height="75">
                                <rect   
                                    height="100%"
                                    fill={globalState.state.currentSession.styleArrays.colorArray[i]}
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