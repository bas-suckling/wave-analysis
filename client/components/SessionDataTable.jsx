import React from 'react'

class SessionDataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                        Total Waves: {this.props.sessionTableData.waveCount}
                        </div>
                        <div class="col-sm">
                        Total Distance: {this.props.sessionTableData.totalDist} m
                        </div>
                        <div class="col-sm">
                        Longest Wave: Wave {this.props.sessionTableData.longestWaveDist.i} - {this.props.sessionTableData.longestWaveDist.dist} m
                        </div>
                        <div class="col-sm">
                        Distance Surfed: {this.props.sessionTableData.waveDist} m
                        </div>
                        <div class="col-sm">
                        Distance Paddled: {this.props.sessionTableData.paddleDist} m
                        </div>
                        <div class="col-sm">
                        Start Time: TO BE ADDED
                        </div>
                        <div class="col-sm">
                        Duration: TO BE ADDED
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default SessionDataTable