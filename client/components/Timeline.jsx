import React from 'react'

class Timeline extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let tempData = [
            {
                'time': 100,
                'isWave': false,
                'totalTime': 630,
                'width': 190.47

            },
            {
                'time': 10,
                'isWave': true,
                'totalTime': 630,
                'width': 19.05


            },
            {
                'time': 300,
                'isWave': false,
                'totalTime': 630,
                'width': 571.43

            },
            {
                'time': 20,
                'isWave': true,
                'totalTime': 630,
                'width': 38.10


            },
            {
                'time': 200,
                'totalTime': 630,
                'isWave': false,
                'width': 380.95
            }
        ]


        return (

            <>
                {tempData.map((width, i) => {
                    return <svg key={i} width={width} height="110px"> <path fill="#FFF" stroke="#000" strokeWidth="1" d="M0 0H1200V110H0z" /></svg>
                })
                }
            </>
        )
    }
}

export default Timeline