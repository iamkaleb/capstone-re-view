import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from '../modals/VideoForm'
import EditVideoForm from '../modals/EditVideoForm'
import DeleteVideoConfirm from '../modals/DeleteVideoConfirm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import AddCategoryForm from '../modals/AddCategoryForm'
import EditCategoryForm from '../modals/EditCategoryForm'
import DeleteCategoryConfirm from '../modals/DeleteCategoryConfirm'

const FilteredList = props => {

    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showEditVideoForm, setShowEditVideoForm] = useState(false);
    const [showDeleteVideoConfirm, setShowDeleteVideoConfirm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
    const [showDeleteCategoryConfirm, setShowDeleteCategoryConfirm] = useState(false);
    const [modalId, setModalId] = useState(0);

    const getFilteredVideos = () => {
        dataManager.getByProperty('categories', 'categoryTitle', props.match.params.categoryTitle)
        .then(categoryArr => {
            const stateToChange = categoryArr[0]
            dataManager.getWithEmbed('categories', stateToChange.id, 'videos')
            .then(embeddedCategory => {
            props.setFilteredCategory(stateToChange)
            props.setFilteredVideos(embeddedCategory.videos)
            })
        })
    }

    useEffect(() => {
        getFilteredVideos()
    }, [props.match.params.categoryTitle])

    const toggleVideoForm = () => {
        showVideoForm ? setShowVideoForm(false) : setShowVideoForm(true)
    }

    const toggleEditVideoForm = id => {
        setModalId(id)
        showEditVideoForm ? setShowEditVideoForm(false) : setShowEditVideoForm(true)
    }

    const toggleDeleteVideoConfirm = id => {
        setModalId(id)
        showDeleteVideoConfirm ? setShowDeleteVideoConfirm(false) : setShowDeleteVideoConfirm(true)
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
            {showEditVideoForm
                ? createPortal(<EditVideoForm
                                    videoId={modalId}
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleEditVideoForm={toggleEditVideoForm}
                                    {...props}
                                />, modalDiv)
                : null
            }
            {showDeleteVideoConfirm
                ? createPortal(<DeleteVideoConfirm
                                    videoId={modalId}
                                    getFilteredVideos={getFilteredVideos}
                                    toggleDeleteVideoConfirm={toggleDeleteVideoConfirm}
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
                                    getFilteredVideos={getFilteredVideos}
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
                <VideoDeck
                    videos={props.filteredVideos}
                    key={props.filteredCategory.id}
                    category={props.filteredCategory}
                    toggleEditVideoForm={toggleEditVideoForm}
                    toggleDeleteVideoConfirm={toggleDeleteVideoConfirm}
                    toggleEditCategoryForm={toggleEditCategoryForm}
                    toggleDeleteCategoryConfirm={toggleDeleteCategoryConfirm}
                    {...props}
                />
            </div>
        </section>
    );
};

export default FilteredList