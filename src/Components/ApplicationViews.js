import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Header from './Header'
import Welcome from './auth/Welcome'
import VideoList from './videos/VideoList';
import VideoPlayer from './videos/VideoPlayer';
import CategoryList from './categories/CategoryList';
import dataManager from '../modules/dataManager';
import './css/MainPage.css'

const ApplicationViews = props => {

    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const clearUser = props.clearUser;
    
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
                render={props => {
                    if (!hasUser) {
                        return <Welcome
                                    setUser={setUser}
                                    hasUser={props.hasUser}
                                    {...props}
                                />
                    } else {
                        return <Redirect to='/videos' />
                    }
                }}
            />
            <Route
                exact
                path='/videos'
                render={props => {
                    if (hasUser) {
                        return (
                            <>
                                <Header clearUser={clearUser}/>  
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
                            </>
                        )
                    } else {
                        return <Redirect to='/'/>
                    }
                }}
            />
            <Route 
                exact
                path="/videos/:videoId(\d+)"
                render={props => {
                if (hasUser) {
                    return (
                        <>
                            <Header clearUser={clearUser}/>
                            <VideoPlayer 
                                videoId={parseInt(props.match.params.videoId)}
                                {...props}
                            />
                        </>
                    )
                } else {
                    return <Redirect to='/' />
                }
                }}         
            />
        </>
    )
}

export default ApplicationViews