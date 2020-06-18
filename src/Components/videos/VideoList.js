import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [showVideoForm, setShowVideoForm] = useState(false);

    const getVideos = () => {
        return dataManager.getByProperty('videos', 'userId', parseInt(sessionStorage.getItem('user')))
        .then(videosArr => setVideos(videosArr))
    }

    const toggleVideoForm = () => {
        showVideoForm ? setShowVideoForm(false) : setShowVideoForm(true)
    }

    useEffect(() => {
        getVideos();
    }, [])

    const modalDiv = document.getElementById('modal');

    return (
        <section className='videoList'>
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
            <p onClick={toggleVideoForm}>New video</p>
            {props.categories.map(mappedCategory =>
                <VideoDeck
                    videos={videos}
                    key={mappedCategory.id}
                    category={mappedCategory}
                />
            )}
        </section>
    )
}

export default VideoList