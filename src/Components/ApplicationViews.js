import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import VideoList from './videos/VideoList';
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
                render={props => {
                    return (
                    <article className='main-page'>  
                        <CategoryList 
                            categories={categories}
                            getCategories={getCategories}
                        />
                        <VideoList 
                            categories={categories}
                            getCategories={getCategories}
                        />
                    </article>
                    )
                }}
            />
        </>
    )
}

export default ApplicationViews