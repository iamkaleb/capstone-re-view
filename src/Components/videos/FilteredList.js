import React, {useState} from 'react'
import {createPortal} from 'react-dom'
import VideoForm from './VideoForm'
// import dataManager from '../../modules/dataManager'
import VideoDeck from './VideoDeck'
import CategoryForm from '../categories/CategoryForm'

const FilteredList = props => {

    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    // const getFilteredVideos = () => {
    //     dataManager.getByProperty('categories', 'categoryTitle', props.categoryTitle)
    //     .then(categoryArr => {
    //         const stateToChange = categoryArr[0]
    //         dataManager.getWithEmbed('categories', stateToChange.id, 'videos')
    //         .then(embeddedCategory => {
    //         props.setFilteredCategory(stateToChange)
    //         props.setFilteredVideos(embeddedCategory.videos)
    //         })
    //     })
    // }

    const toggleVideoForm = () => {
        showVideoForm ? setShowVideoForm(false) : setShowVideoForm(true)
    }

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <section className='video-list'>
            {showVideoForm
                ? createPortal(<VideoForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
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
                <VideoDeck
                    videos={props.filteredVideos}
                    key={props.filteredCategory.id}
                    category={props.filteredCategory}
                    {...props}
                />
            </div>
        </section>
    );
};

export default FilteredList