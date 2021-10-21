import React from 'react'
import { SemipolarLoading } from 'react-loadingg';

const LoadingPage = (props) => {
    return (
        <div style={{ height: '100%', width: '100%', zIndex: '100', backgroundColor: '#f2f2f2', minHeight: props.minHeight, display: 'flex' }
        }>
            <SemipolarLoading
                color={'#2C2C2C'}
                size="large"
                style={{ margin: 'auto' }}
            />
        </div >
    )
}

export default LoadingPage