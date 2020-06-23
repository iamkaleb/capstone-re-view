import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from '../modals/VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../modals/CategoryForm'
import DeleteCategoryConfirm from '../modals/DeleteCategoryConfirm'

const FilteredList = props => {

    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
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

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
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
            {showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
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
            <div className='add-buttons'>
                <p className='add-button' onClick={toggleVideoForm}> &#x2b; New video</p>
                <p className='add-button' onClick={toggleCategoryForm}> &#x2b; New category</p>
            </div>
            <div className='video-decks'>
                <VideoDeck
                    videos={props.filteredVideos}
                    key={props.filteredCategory.id}
                    category={props.filteredCategory}
                    toggleDeleteCategoryConfirm={toggleDeleteCategoryConfirm}
                    {...props}
                />
            </div>
        </section>
    );
};

export default FilteredList