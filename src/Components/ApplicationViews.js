import React from 'react';
import {Route} from 'react-router-dom';
import VideoList from './videos/VideoList';

const ApplicationViews = props => {
    
    return (
        <>
            <Route
                exact
                path='/'
                render={props => {
                    return <VideoList />;
                }}
            />
        </>
    )
}

export default ApplicationViews