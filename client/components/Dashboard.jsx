import React, {useState, useEffect} from 'react'
import SessionDataTable from './SessionDataTable'
import LeafletMap from './LeafletMap'
import Footer from './Footer'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'
import Timeline from './Timeline'

//remove?
//import { isPointInLine } from 'geolib'
//import WaveGraph from './WaveGraph'
//import surfData from '../../server/data/processedData/2020-08-01_processed.json'  // only used by old graph

const Dashboard = () => {
    
        // this.state = {
        //     sessions: [],
        //     tempData: null,
        //     currentSession: [],
        //     sessionTitle: "Session Analysis",
        //     currentMeta: []
        // }

    const [sessions, setSessions] = useState([])
    const [currentSession, setCurrentSession] = useState([])
    const [sessionTitle, setSessionTitle] = useState(["Session Analysis"])

    useEffect(() => {
        apiGetSessionsList()
            .then(res => setSessions(res))
            .then(           

        apiGetSessionData(7)
            .then(res => {
                setCurrentSession({
                    sessionData: res.currentSession,
                    metaData: res.currentMeta,
                })                   
            })
    )}, [])

    const handleClick = session => {
        apiGetSessionData(session.session_id)
            .then((res => setCurrentSession({
                sessionData: res.currentSession,
                metaData: res.currentMeta,
            })  
        ))
        .then(setSessionTitle(session.date))
    }


        return (
            <>
                {(currentSession.length < 2) ?
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
                                    {sessions.map((session, i) => {
                                        return <h6 key={i} className={"session-link"} onClick={() => handleClick(session)}>{session.date}</h6>
                                    })}
                                </div>
                            </div>
                            <div className="col-10 " id='map-container'>
                                <div>
                                    <SessionDataTable sessionTableData={currentSession.metaData} sessionTitle={sessionTitle} />
                                </div>
                                <div>
                                    <LeafletMap segments={currentSession.sessionData} />
                                </div>
                                <div>
                                    <Timeline segments={currentSession.sessionData} sessionMeta={currentSession.metaData}/>
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
