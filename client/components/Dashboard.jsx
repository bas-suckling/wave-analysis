import React from 'react'
import SessionDataTable from './SessionDataTable'
import LeafletMap from './LeafletMap'
import Footer from './Footer'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'

//remove?
//import { isPointInLine } from 'geolib'
//import WaveGraph from './WaveGraph'
//import surfData from '../../server/data/processedData/2020-08-01_processed.json'  // only used by old graph

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: [],
            tempData: null,
            currentSession: [],
            sessionTitle: "Session Analysis",
            currentMeta: []
            // currentMeta: {
            //     "date":"",
            //     "dur": "",
            //     "waveCount": "",
            //     "totalDist": "",
            //     "paddleDist": "",
            //     "waveDist": "",
            //     "longestWaveDist": {
            //         "i": "",
            //         "dist": ""
            //     },
            //     "longestWaveDur": {
            //         "i": "",
            //         "dur": ""
            //     },
            //     "longestPaddleDist": {
            //         "i": "",
            //         "dist": ""
            //     },
            //     "longestPaddleDur": {
            //         "i": "",
            //         "dur": ""
            //     }
            // }
        }
    }

    componentDidMount() {
        apiGetSessionsList()
            .then(res => this.setState({
                sessions: res
            }))

        apiGetSessionData(7)
            .then(res => this.setState({
                currentSession: res.currentSession,
                currentMeta: res.currentMeta
            }))
    }


    handleClick(session) {
        apiGetSessionData(session.session_id)
            .then((res => this.setState({
                currentSession: res.currentSession,
                currentMeta: res.currentMeta,
                sessionTitle: session.date
            })))
    }

    render() {

        return (
            <>
                {(this.state.currentSession.length < 2) ?
                    <div className="loading-spinner">
                        <h4>Data loading...</h4>
                        <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">

                        </div>
                    </div>
                    :
                    <div className={"container-fluid"}>
                        <div className="row">
                            <div className={"col-2 dark-bg light-text"}>
                                <div className={"container"}>
                                    <img className="logo" src="./images/BFBSA_Logo_White.png" alt="logo" />
                                    <h1 className="heading">Sessions</h1>
                                    {this.state.sessions.map((session, i) => {
                                        return <h6 key={i} className={"session-link"} onClick={() => this.handleClick(session)}>{session.date}</h6>
                                    })}
                                </div>
                            </div>
                            <div className="col-8 " id='map-container'>
                                <div>
                                    <SessionDataTable sessionTableData={this.state.currentMeta} sessionTitle={this.state.sessionTitle} />
                                </div>
                                <div>
                                    <LeafletMap segments={this.state.currentSession} />
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
}

export default Dashboard
