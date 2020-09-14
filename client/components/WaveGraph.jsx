import React from 'react'
import ChartistGraph from 'react-chartist';

import ChartistAxisTitle from 'chartist-plugin-axistitle'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import Chartist from 'chartist'

const WaveGraph = () => {

    let data = {
        labels: props.sessionData.timeData,
        series: [props.sessionData.waves, props.sessionData.paddling, props.sessionData.waveLine]
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
            ChartistTooltip({ appendToBody: true })]
    };

    var type = 'Line'


    return (
        <>
            <div>
                <ChartistGraph data={data} options={options} type={type} />
            </div>

        </>
    )
}


export default WaveGraph