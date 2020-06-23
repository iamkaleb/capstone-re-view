import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from '../modals/VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../modals/CategoryForm'
import DeleteCategoryConfirm from '../modals/DeleteCategoryConfirm'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [populatedCategories, setPopulatedCategories] = useState([])
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showDeleteCategoryConfirm, setShowDeleteCategoryConfirm] = useState(false);
    const [modalId, setModalId] = useState(0);

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

    const toggleDeleteCategoryConfirm = id => {
        setModalId(id)
        showDeleteCategoryConfirm ? setShowDeleteCategoryConfirm(false) : setShowDeleteCategoryConfirm(true)
    }

    useEffect(() => {
        getVideosAndCategories();
    }, [])

    const modalDiv = document.getElementById('modal');

    return (
        <section className='list-view'>
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
                                    showDeleteCategoryConfirm={showDeleteCategoryConfirm}
                                    {...props}
                                />, modalDiv)
                : null
            }
            {showDeleteCategoryConfirm
                ? createPortal(<DeleteCategoryConfirm
                                    categoryId={modalId}
                                    toggleDeleteCategoryConfirm={toggleDeleteCategoryConfirm}
                                    getVideosAndCategories={getVideosAndCategories}
                                    getCategories={props.getCategories}
                                    {...props}
                                />, modalDiv)
                : null
            }
            <div className='add-buttons'>
                <p className='add-button' onClick={toggleVideoForm}> &#x2b; New video</p>
                <p className='add-button' onClick={toggleCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                {populatedCategories.map(mappedCategory =>
                    <VideoDeck
                        videos={videos}
                        key={mappedCategory.id}
                        category={mappedCategory}
                        toggleDeleteCategoryConfirm={toggleDeleteCategoryConfirm}
                        {...props}
                    />
                )}
            </div>
        </section>
    )
}

export default VideoList