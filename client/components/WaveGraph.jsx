import React from 'react'
import ChartistGraph from 'react-chartist';
import waveData from '../../data/2020-05-25/Surf_2020-05-25_PROC.json'

class WaveGraph extends React.Component {
    render() {
   
        let speedData = []
        let timeData = []
        waveData.forEach(function(element){
            speedData.push(element.speed.toString())
            timeData.push(element.parseTime)
            }
        )

        let data = {
            lables: timeData,
            series: [speedData]
        }
   
      var options = {
        high: 30,
        low: 0,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 100 === 0 ? value : null;
          }
        }
      };
   
      var type = 'Line'
   
      return (
        <div>
          <ChartistGraph data={data} options={options} type={type} />
        </div>
      )
    }
  }

export default WaveGraph