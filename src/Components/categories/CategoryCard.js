import React from 'react'
import dataManager from '../../modules/dataManager'

const CategoryCard = props => {

    const filterbyCategory = () => {
            dataManager.getWithEmbed('categories', props.category.id, 'videos')
            .then(embeddedCategory => {
                props.history.push(`/videos/${props.category.categoryTitle}`)
                props.setFilteredCategory(props.category)
                props.setFilteredVideos(embeddedCategory.videos)
            })
        }

    return (
            <p onClick={filterbyCategory} className='category'>{props.category.categoryTitle}</p>
    )
}

export default CategoryCard