import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <h4>Data loading...</h4>
            <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
            </div>
        </div>
    )
}

export default LoadingSpinner