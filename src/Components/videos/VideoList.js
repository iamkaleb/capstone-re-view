import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../categories/CategoryForm'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [populatedCategories, setPopulatedCategories] = useState([])
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

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
        showVideoForm ? setShowVideoForm(false) : setShowVideoForm(true)
    }

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
    }

    useEffect(() => {
        getVideosAndCategories();
    }, [])

    const modalDiv = document.getElementById('modal');

    return (
        <section className='video-list'>
            {showVideoForm
                ? createPortal(<VideoForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleVideoForm={toggleVideoForm}
                                    {...props}
                                />, modalDiv)
                : null
            }
            {showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
                                    {...props}
                                />, modalDiv)
                : null
            }
            <div className='add-buttons'>
                <p onClick={toggleVideoForm}> &#x2b; New video</p>
                <p onClick={toggleCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                {populatedCategories.map(mappedCategory =>
                    <VideoDeck
                        videos={videos}
                        key={mappedCategory.id}
                        category={mappedCategory}
                        {...props}
                    />
                )}
            </div>
        </section>
    )
}

export default VideoList