import React from 'react'

function Navigation(props) {
    <div className={"container"}>
        <img className="logo" src="./images/BFBSA_Logo_White.png" alt="logo" />
        <h1 className="heading">Sessions</h1>
        {props.sessions.map((session, i) => {
            return <h6 key={i} className={"session-link"} onClick={() => this.handleClick(session)}>{session.date}</h6>
        })}
    </div>
}

export default Navigation