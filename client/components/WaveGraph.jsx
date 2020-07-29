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
            timeData.push(element.parseTime)
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
            width: '80%',
            overflow: 'visible',
            
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 100 === 0 ? value : null;
                },
                

            },
            showPoint: false,
            plugins: [ChartistAxisTitle({
                axisX: {
                    axisTitle: 'Time',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 20
                    },
                    textAnchor: 'middle',
                },
                axisY: {
                    axisTitle: 'Speed (km/h)',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 0
                    },
                    textAnchor: 'middle',
                    flipTitle: false
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