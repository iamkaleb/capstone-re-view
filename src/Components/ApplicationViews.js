import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import VideoList from './videos/VideoList';
import CategoryList from './categories/CategoryList';
import dataManager from '../modules/dataManager';

const ApplicationViews = props => {

    const [categories, setCategories] = useState([]);

    return (
        <>
            <Route
                exact
                path='/'
                render={props => {
                    return (
                    <>    
                        <CategoryList 
                            categories={categories}
                            setCategories={setCategories}
                        />
                        <VideoList />
                    </>
                    )
                }}
            />
        </>
    )
}

export default ApplicationViews