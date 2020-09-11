import React from 'react'
import SessionDataTable from './SessionDataTable'
import LeafletMap from './LeafletMap'

import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'

//remove?
//import { isPointInLine } from 'geolib'
import WaveGraph from './WaveGraph'
import surfData from '../../server/data/processedData/2020-08-01_processed.json'  // only used by old graph

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: [],
            tempData: null,
            currentSession: [],
            currentMeta: {
                "dur:": "",
                "waveCount": "",
                "totalDist": "",
                "paddleDist": "",
                "waveDist": "",
                "longestWaveDist": {
                    "i": "",
                    "dist": ""
                },
                "longestWaveDur": {
                    "i": "",
                    "dur": ""
                },
                "longestPaddleDist": {
                    "i": "",
                    "dist": ""
                },
                "longestPaddleDur": {
                    "i": "",
                    "dur": ""
                }
            }
        }
    }

    componentDidMount() {
        apiGetSessionsList()
            .then(res => this.setState({
                sessions: res
            }))

        apiGetSessionData(2)
            .then(res => this.setState({
                currentSession: res.currentSession,
                currentMeta: res.currentMeta
            }))
    }


    handleClick(session) {
        apiGetSessionData(session.session_id)
            .then((res => this.setState({
                currentSession: res.currentSession,
                currentMeta: res.currentMeta
            })))
    }

    render() {
        // let waves = []
        // let timeData = []
        // let waveLine = []

        // surfData.forEach(function (element) {
        //     waves.push(element.speed)
        //     timeData.push(element.elapsedTime)
        //     waveLine.push(8)
        // })

        // let sessionData = {
        //     waves: waves,
        //     timeData: timeData,
        //     waveLine: waveLine,
        // } 

        return (
            <>

            <div className={"container-fluid"}>
                <div className="row">
                    <div className={"col-2"}>
                        <div className={"container"}>
                            <img className="logo" src="./images/BFBSA_Logo_Black.png" alt="logo"/>
                            <h1 className="heading">Sessions</h1>
                                {this.state.sessions.map((session, i) => {
                                    return <h6 key={i} className={"session-link"} onClick={() => this.handleClick(session)}>{session.date}</h6>
                                })}
                        </div>
                    </div>
                    <div className={"col-8"}>
                        <div>
                            {/* this.state.currentMeta.date - to be added */}
                            <SessionDataTable sessionTableData={this.state.currentMeta} />
                            <br />
                        </div>
                        <div >
                            {(this.state.currentSession.length < 2) ?
                                <h2>Map Loading</h2> :
                                <LeafletMap sessionTrackPoints={this.state.currentSession} />
                            }
                        </div>

                    </div>
                    
                </div>

            </div>


                

                {/* <div style={{ padding: '2%', height: "50%"}}>
                    <WaveGraph style={{ padding: '2%', height: "100px"}} sessionData={sessionData} />
                </div> */}
            </>
        )
    }
}

export default Dashboard
