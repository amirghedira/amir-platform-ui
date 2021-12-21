import React from 'react'
import { Spinner } from 'reactstrap';

const LoadingPage = (props) => {
    return (
        <div style={{ height: '100%', width: '100%', zIndex: '100', backgroundColor: '#f2f2f2', minHeight: props.minHeight, display: 'flex' }
        }>
            <Spinner
                color="primary"
                size="large"
                style={{ margin: 'auto' }}
            />
        </div >
    )
}

export default LoadingPage