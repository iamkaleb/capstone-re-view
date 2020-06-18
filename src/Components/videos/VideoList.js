import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../categories/CategoryForm'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const getVideos = () => {
        return dataManager.getByProperty('videos', 'userId', parseInt(sessionStorage.getItem('user')))
        .then(videosArr => setVideos(videosArr))
    }

    const toggleVideoForm = () => {
        showVideoForm ? setShowVideoForm(false) : setShowVideoForm(true)
    }

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
    }

    useEffect(() => {
        getVideos();
    }, [])

    const modalDiv = document.getElementById('modal');

    return (
        <section className='video-list'>
            {showVideoForm
                ? createPortal(<VideoForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    videos={videos}
                                    getVideos={getVideos}
                                    toggleVideoForm={toggleVideoForm}
                                />, modalDiv)
                : null
            }
            {showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
                                />, modalDiv)
                : null
            }
            <div className='add-buttons'>
                <p onClick={toggleVideoForm}> &#x2b; New video</p>
                <p onClick={toggleCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                {props.categories.map(mappedCategory =>
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