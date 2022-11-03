import React from 'react'
import classes from './LoadingSpinner.module.css'
import { Spinner } from 'reactstrap'

const LoadingSpinner = () => {
    return (
        <div className={classes.mainContainer} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Spinner style={{ height: '80px', width: '80px', color: '#2C2C2C', borderWidth: '8px' }} />
        </div>

    )
}

export default LoadingSpinner
