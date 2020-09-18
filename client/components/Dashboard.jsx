import React, { useEffect, useContext } from 'react'
import { store } from '../../dataStore'

import SessionDataTable from './SessionDataTable'
import LeafletMap from './LeafletMap'
import Footer from './Footer'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'
import Timeline from './Timeline'
import LoadingSpinner from './LoadingSpinner'

import {createInitialArrays} from '../helpers/mapStyles' 
import Sidebar from './Sidebar'

const Dashboard = () => {

    const globalState = useContext(store)
    const { dispatch } = globalState

    useEffect(() => {
        apiGetSessionsList()
            .then(res => {
                dispatch({
                    type: 'setSessions',
                    payload: res
                })
            })
            .then(apiGetSessionData(1)
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
                        dispatch({
                            type: 'setCurrentSegment',
                            payload: ""
                        })
                    })
                )
    }, [])

        return (
        <>
            {(globalState.state.currentSession.length < 2) ?
                <LoadingSpinner/>
                :
                <div className={"container-fluid"}>
                    <div className="row">
                        <div className={"col-2 dark-bg fixed-top sidebar"}>
                            <Sidebar/>
                        </div>
                        <div className="col-10 offset-2" id='map-container'>
                            <div className="sticky-top data-table">
                                <SessionDataTable />
                            </div>
                            <div className="light-bg">
                                <LeafletMap />
                            </div>
                            <br />
                            <div>
                                <Timeline />
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
