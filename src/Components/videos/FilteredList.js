import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../categories/CategoryForm'

const FilteredList = props => {

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
        props.showVideoForm ? props.setShowVideoForm(false) : props.setShowVideoForm(true)
    }

    const toggleCategoryForm = () => {
        props.showCategoryForm ? props.setShowCategoryForm(false) : props.setShowCategoryForm(true)
    }

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
                <VideoDeck
                    videos={props.filteredVideos}
                    key={props.filteredCategory.id}
                    category={props.filteredCategory}
                    showVideoForm={props.showVideoForm}
                    setShowVideoForm={props.setShowVideoForm}
                    showCategoryForm={props.showCategoryForm}
                    setShowCategoryForm={props.setShowCategoryForm}
                    {...props}
                />
            </div>
        </section>
    );
};

export default FilteredList