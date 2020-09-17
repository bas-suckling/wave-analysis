import React, {useContext} from 'react'
import { store } from '../../dataStore'
import { apiGetSessionData } from '../api/sessions'
import {createInitialArrays} from '../helpers/mapStyles' 

const Sidebar = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState

    const handleClick = session => {
        apiGetSessionData(session.session_id)
        .then(res => {
            dispatch({
                type: 'setCurrentSession',
                payload: {
                    sessionData: res.currentSession,
                    metaData: res.currentMeta,
                    styleArrays: createInitialArrays(res.currentSession)                    
                }
            })
        })
        // .then(setSessionTitle(session.date))
    }

    return (
        <div className={"container sidebar-sticky"}>
            <img className="logo" src="./images/BFBSA_Logo_White.png" alt="logo" />
            <h1 className="heading">Sessions</h1>
            {globalState.state.allSessions.map((session, i) => {
                return <h6 key={i} className={"session-link"} onClick={() => handleClick(session)}>{session.date}</h6>
            })}
        </div>
    )
}

export default Sidebar