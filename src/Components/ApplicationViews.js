import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Header from './Header'
import Welcome from './auth/Welcome'
import VideoList from './videos/VideoList';
import FilteredList from './videos/FilteredList'
import VideoPlayer from './videos/VideoPlayer';
import CategoryList from './categories/CategoryList';
import dataManager from '../modules/dataManager';
import './css/MainPage.css'

const ApplicationViews = props => {

    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const clearUser = props.clearUser;

    const [filteredVideos, setFilteredVideos] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState({categoryTitle: "", userId: parseInt(sessionStorage.getItem('user')), categoryId: 0});
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        return dataManager.getWithEmbed('users', parseInt(sessionStorage.getItem('user')), 'categories')
        .then(user => 
            setCategories(user.categories.sort((categoryA, categoryB) => (categoryA.categoryTitle > categoryB.categoryTitle) ? 1 : -1)))
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
                                <Header 
                                    clearUser={clearUser}
                                    {...props}
                                />  
                                <article className='main-page'>
                                    <CategoryList 
                                        categories={categories}
                                        getCategories={getCategories}
                                        setFilteredCategory={setFilteredCategory}
                                        setFilteredVideos={setFilteredVideos}
                                        {...props}
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
                path="/videos/:categoryTitle"
                render={props => {
                if (hasUser) {
                    return (
                            <>
                                <Header 
                                    clearUser={clearUser}
                                    {...props}
                                />  
                                <article className='main-page'>
                                    <CategoryList 
                                        categories={categories}
                                        getCategories={getCategories}
                                        setFilteredCategory={setFilteredCategory}
                                        setFilteredVideos={setFilteredVideos}
                                        {...props}
                                    />
                                    <FilteredList 
                                        categoryTitle={props.match.params.categoryTitle}
                                        categories={categories}
                                        getCategories={getCategories}
                                        filteredCategory={filteredCategory}
                                        setFilteredCategory={setFilteredCategory}
                                        filteredVideos={filteredVideos}
                                        setFilteredVideos={setFilteredVideos}
                                        {...props}
                                    />
                                </article>
                            </>
                        )
                } else {
                    return <Redirect to='/' />
                }
                }}         
            />
            <Route 
                exact
                path="/videos/:categoryTitle/:videoId(\d+)"
                render={props => {
                if (hasUser) {
                    return (
                        <>
                            <Header 
                                clearUser={clearUser}
                                {...props}
                            />  
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