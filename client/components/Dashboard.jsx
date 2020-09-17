import React, { useState, useEffect, useContext } from 'react'
import { store } from '../../dataStore'

import SessionDataTable from './SessionDataTable'
import LeafletMap from './LeafletMap'
import Footer from './Footer'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'
import Timeline from './Timeline'

import {createInitialArrays} from '../helpers/mapStyles' 

const Dashboard = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState
    
    // dispatch({type: 'setCurrentSession'})

    // const [sessions, setSessions] = useState([])
    // const [currentSession, setCurrentSession] = useState([])
    // const [sessionTitle, setSessionTitle] = useState(["Session Analysis"])

    useEffect(() => {
        apiGetSessionsList()
            .then(res => {
                dispatch({
                    type: 'setSessions',
                    payload: res
                })
            })
            .then(apiGetSessionData(8)
                    .then(res => {
                        dispatch({
                            type: 'setCurrentSession',
                            payload: {
                                sessionData: res.currentSession,
                                metaData: res.currentMeta,
                                styleArrays: createInitialArrays(res.currentSession)
                            }
                        }
                        )
                    })
                )
    }, [])

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
        <>
            {(globalState.state.currentSession.length < 2) ?
                <div className="loading-spinner">
                    <h4>Data loading...</h4>
                    <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
                    </div>
                </div>
                :
                <div className={"container-fluid"}>
                    <div className="row">
                        <div className={"col-2 dark-bg sidebar light-text"}>
                            <div className={"container sidebar-sticky"}>
                                <img className="logo" src="./images/BFBSA_Logo_White.png" alt="logo" />
                                <h1 className="heading">Sessions</h1>
                                {globalState.state.allSessions.map((session, i) => {
                                    return <h6 key={i} className={"session-link"} onClick={() => handleClick(session)}>{session.date}</h6>
                                })}
                            </div>
                        </div>
                        <div className="col-10 " id='map-container'>
                            <div>
                                <SessionDataTable sessionTitle={"Session Analysis"} />
                            </div>
                            <div className="light-bg">
                                <LeafletMap />
                            </div>
                            <br />
                            <div>
                                <Timeline segments={globalState.state.currentSession.sessionData} sessionMeta={globalState.state.currentSession.metaData} />
                            </div>
                            <div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>


            }
        </>
    )
}

export default Dashboard
