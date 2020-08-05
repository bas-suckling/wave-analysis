import React from 'react'
import WaveGraph from './WaveGraph'
import SessionDataTable from './SessionDataTable'
import WaveDataTable from './WaveDataTable'

import surfData from '../../server/data/processedData/2020-08-01.json'
import waveData from '../../server/data/processedData/2020-08-01_waves.json'
import { apiGetSessionsList, apiGetSessionData } from '../api/sessions'

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

        apiGetSessionData(2)
        .then(res => this.setState({
           tempData: res
        }))
    }

    render() {
    let waves = []
    let paddling = []
    let timeData = []
    let waveLine = []
    
    surfData.forEach(function (element) {
        waves.push(element.wSpeed)
        paddling.push(element.pSpeed)
        timeData.push(element.elapsedTime)
        waveLine.push(8)
    })

    let sessionData = {
        waves: waves,
        paddling: paddling,
        timeData: timeData,
        waveLine: waveLine,
    } 
        
    let sessionTableData = {
        waves: waveData.length,
        distanceSurfed: 700,
        distancePaddled: 5000,
        totalDistance: 5700,
        maxSpeed: 30,
        longestWave: 150
    }

    let singleWaveData = {
        wave_id: 1,
        distanceSurfed: 150,
        maxSpeed: 30,
        timeStamp: "03:33:33",
    }
        return (
            <>
                <h1>Sessions</h1>
                <ul>
                    {this.state.sessions.map((session, i) => {
                        return <li key={i}>{session.date}</li>
                    })}
                </ul>
                
                <div style={{ padding: '2%' }}>
                    <WaveGraph sessionData={sessionData}/>
                </div>
                <div>
                    <SessionDataTable sessionTableData={sessionTableData} />
                    <br />
                </div>
                <div>
                    <WaveDataTable singleWaveData={singleWaveData} />
                </div>
            </>
            )
        
    }
}

export default Dashboard
