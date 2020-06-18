import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import VideoList from './videos/VideoList';
import VideoPlayer from './videos/VideoPlayer';
import CategoryList from './categories/CategoryList';
import dataManager from '../modules/dataManager';
import './css/MainPage.css'

const ApplicationViews = props => {

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        return dataManager.getByProperty('categories', 'userId', parseInt(sessionStorage.getItem('user')))
        .then(categoriesArr => setCategories(categoriesArr.sort((a, b) => (a.categoryTitle > b.categoryTitle) ? 1 : -1)))
    }

    return (
        <>
            <Route
                exact
                path='/'
                render={() => {
                    return (
                    <article className='main-page'>  
                        <CategoryList 
                            categories={categories}
                            getCategories={getCategories}
                        />
                        <VideoList 
                            categories={categories}
                            getCategories={getCategories}
                            {...props}
                        />
                    </article>
                    )
                }}
            />
            <Route 
                exact
                path="/:videoId(\d+)"
                render={props => {
                return (
                <VideoPlayer 
                    videoId={parseInt(props.match.params.videoId)}
                    {...props}
                />
                );
            }}         
            />
        </>
    )
}

export default ApplicationViews