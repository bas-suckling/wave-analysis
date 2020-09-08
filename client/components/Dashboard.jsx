import React from 'react'
import SessionDataTable from './SessionDataTable'
import WaveDataTable from './WaveDataTable'
import LeafletMap from './LeafletMap'
import mapPoints from '../../server/data/processedData/2020-05-25_segmented.json'
//import waveData from '../../server/data/processedData/2020-08-01_segmented.json'
import metaD from '../../server/data/processedData/2020-05-25_meta.json'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'

//remove?
//import { isPointInLine } from 'geolib'
import WaveGraph from './WaveGraph'
import surfData from '../../server/data/processedData/2020-08-01_processed.json'  // only used by old graph

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            sessions:[],
            tempData: null
        }
    }

    componentDidMount() {
        apiGetSessionsList()
        .then(res => this.setState({
            sessions: res
        }))
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
        
    let sessionTableData = {

        waves:              metaD.waveCount,
        distanceSurfed:     metaD.waveDist,
        distancePaddled:    metaD.paddleDist,
        totalDistance:      metaD.totalDist,
        longestWave:        metaD.longestWaveDist.dist
    }

        return (
            <>
                <h1>Sessions</h1>
                <ul>
                    {this.state.sessions.map((session, i) => {
                        return <li key={i}>{session.date}</li>
                    })}
                </ul>
                <div>
                    <h1>Wave Analysis for 2020-08-01</h1>
                    <SessionDataTable sessionTableData={sessionTableData} />
                    <br />
                </div>
                <div>
                    <LeafletMap sessionTrackPoints={mapPoints}/>
                </div>
                {/* <div style={{ padding: '2%', height: "50%"}}>
                    <WaveGraph style={{ padding: '2%', height: "100px"}} sessionData={sessionData} />
                </div> */}
                                
            </>
            )
    }
}

export default Dashboard
