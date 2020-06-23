import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from '../modals/VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import AddCategoryForm from '../modals/AddCategoryForm'
import EditCategoryForm from '../modals/EditCategoryForm'
import DeleteCategoryConfirm from '../modals/DeleteCategoryConfirm'

const VideoList = props => {

    const [videos, setVideos] = useState([]);
    const [populatedCategories, setPopulatedCategories] = useState([])
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
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

    const toggleAddCategoryForm = () => {
        showAddCategoryForm ? setShowAddCategoryForm(false) : setShowAddCategoryForm(true)
    }

    const toggleEditCategoryForm = id => {
        setModalId(id)
        showEditCategoryForm ? setShowEditCategoryForm(false) : setShowEditCategoryForm(true)
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
            {showAddCategoryForm
                ? createPortal(<AddCategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleAddCategoryForm={toggleAddCategoryForm}
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
            {showEditCategoryForm
                ? createPortal(<EditCategoryForm
                                    categoryId={modalId}
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    getVideosAndCategories={getVideosAndCategories}
                                    toggleEditCategoryForm={toggleEditCategoryForm}
                                    {...props}
                                />, modalDiv)
                : null
            }
            <div className='add-buttons'>
                <p className='add-button' onClick={toggleVideoForm}> &#x2b; New video</p>
                <p className='add-button' onClick={toggleAddCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                {populatedCategories.map(mappedCategory =>
                    <VideoDeck
                        videos={videos}
                        key={mappedCategory.id}
                        category={mappedCategory}
                        toggleEditCategoryForm={toggleEditCategoryForm}
                        toggleDeleteCategoryConfirm={toggleDeleteCategoryConfirm}
                        {...props}
                    />
                )}
            </div>
        </section>
    )
}

export default VideoList