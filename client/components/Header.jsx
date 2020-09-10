import React from 'react'

class Header extends React.Component {

    render() {
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <img className="logo" src="./images/BFBSA_Logo_Black.png" alt="logo"/>
                    </div>
                    <div className={"col-10"}>
                        <h1>Wave Analysis</h1>
                    </div>
                </div>
            </div>
        )


    }

}

export default Header