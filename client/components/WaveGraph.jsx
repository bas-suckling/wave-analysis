import React from 'react'
import ChartistGraph from 'react-chartist';
import surfData from '../../data/2020-08-01/Surf_2020-08-01_PROC.json'
import waveData from '../../data/2020-08-01/Surf_2020-08-01_waves.json'
import ChartistAxisTitle from 'chartist-plugin-axistitle'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import Chartist from 'chartist'

import SessionDataTable from './SessionData'
import WaveDataTable from './WaveData'


class WaveGraph extends React.Component {
    render() {

        let speedData = []
        let timeData = []
        let waveLine = []

        surfData.forEach(function (element) {
            speedData.push(element.speed.toString())
            timeData.push(element.elapsedTime)
            waveLine.push(8)
        }
        )

        let data = {
            labels: timeData,
            series: [speedData, waveLine]
        }

        var options = {
            high: 35,
            low: 0,
            height: '450px',
            width: '8000px',
            overflow: 'visible',
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 200
              }),
            
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 150 === 0 ? value : null;
                },
                offset: 50
            },
            showPoint: false,
            plugins: [
                ChartistAxisTitle({
                    axisX: {
                        axisTitle: 'Time (hh:mm:ss)',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: 40
                        },
                        textAnchor: 'middle',
                    },
                    axisY: {
                        axisTitle: 'Speed (km/h)',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: 12
                        },
                        textAnchor: 'middle',
                        flipTitle: true
                    }
                }),
                ChartistTooltip({appendToBody: true})]
        };

        var type = 'Line'

        let sessionData = {
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
                <div>
                    <ChartistGraph data={data} options={options} type={type}/>
                </div>
                <div>
                    <SessionDataTable sessionData={sessionData}/>
                    <br/>
                </div>
                <div>
                    <WaveDataTable singleWaveData={singleWaveData}/>
                </div>
            </>
        )
    }
}

export default WaveGraph