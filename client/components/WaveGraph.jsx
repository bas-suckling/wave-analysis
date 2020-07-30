import React from 'react'
import ChartistGraph from 'react-chartist';
import waveData from '../../data/2020-05-25/Surf_2020-05-25_PROC.json'
import ChartistAxisTitle from 'chartist-plugin-axistitle'


class WaveGraph extends React.Component {
    render() {

        let speedData = []
        let timeData = []
        let waveLine = []

        waveData.forEach(function (element) {
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
            high: 30,
            low: 0,
            height: '450px',
            overflow: 'visible',
            
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 150 === 0 ? value : null;
                },
                offset: 50
                
                

            },
            showPoint: false,
            plugins: [ChartistAxisTitle({
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
            })]
        };

        var type = 'Line'

        return (
            <div>
                <ChartistGraph data={data} options={options} type={type}/>
            </div>
        )
    }
}

export default WaveGraph