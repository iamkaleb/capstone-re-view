import React from 'react'
import dataManager from '../../modules/dataManager'

const CategoryCard = props => {

    const filterbyCategory = () => {
            dataManager.getWithEmbed('categories', props.category.id, 'videos')
            .then(props.history.push(`/videos/${props.category.categoryTitle}`))
        }

    return (
            <h3 onClick={filterbyCategory} className='category'>{props.category.categoryTitle}</h3>
    )
}

export default CategoryCard