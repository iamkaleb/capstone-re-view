import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../categories/CategoryForm'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [populatedCategories, setPopulatedCategories] = useState([])

    const getVideosAndCategories = () => {
        return dataManager.getWithEmbed('users', parseInt(sessionStorage.getItem('user')), 'videos')
        .then(user => {
            setVideos(user.videos)
            const categoryIdsSet = new Set();
            user.videos.map(video => categoryIdsSet.add(video.categoryId))
            const categoryIdsArr = Array.from(categoryIdsSet)
            Promise.all(categoryIdsArr.map(categoryId => fetch(`http://localhost:8088/categories/${categoryId}`)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(categoryArr => {
                setPopulatedCategories(categoryArr.sort((categoryA, categoryB) => (categoryA.categoryTitle > categoryB.categoryTitle) ? 1 : -1));
            });
        });
    };

    const toggleVideoForm = () => {
        props.showVideoForm ? props.setShowVideoForm(false) : props.setShowVideoForm(true)
    }

    const toggleCategoryForm = () => {
        props.showCategoryForm ? props.setShowCategoryForm(false) : props.setShowCategoryForm(true)
    }

    useEffect(() => {
        getVideosAndCategories();
    }, [])

    const modalDiv = document.getElementById('modal');

    return (
        <section className='video-list'>
            {props.showVideoForm
                ? createPortal(<VideoForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleVideoForm={toggleVideoForm}
                                    isLoading={props.isLoading}
                                    setIsLoading={props.setIsLoading}
                                    {...props}
                                />, modalDiv)
                : null
            }
            {props.showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
                                    isLoading={props.isLoading}
                                    setIsLoading={props.setIsLoading}
                                    {...props}
                                />, modalDiv)
                : null
            }
            <div className='add-buttons'>
                <p disabled={props.showLoginForm || props.showCategoryForm} onClick={toggleVideoForm}> &#x2b; New video</p>
                <p disabled={props.showLoginForm || props.showCategoryForm} onClick={toggleCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                {populatedCategories.map(mappedCategory =>
                    <VideoDeck
                        videos={videos}
                        key={mappedCategory.id}
                        category={mappedCategory}
                        showVideoForm={props.showVideoForm}
                        setShowVideoForm={props.setShowVideoForm}
                        showCategoryForm={props.showCategoryForm}
                        setShowCategoryForm={props.setShowCategoryForm}
                        {...props}
                    />
                )}
            </div>
        </section>
    )
}

export default VideoList