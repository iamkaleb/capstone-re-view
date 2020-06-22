import React, {useEffect} from 'react'
import CategoryCard from './CategoryCard'
import '../css/Sidebar.css'

const CategoryList = props => {
    
    useEffect(() => {
        props.getCategories();
    }, [])

    return (
        <section className='sidebar'>
                <p className='category' onClick={() => props.history.push('/videos')}>All Videos</p>
            {props.categories.map(category =>
                <CategoryCard 
                    key={category.id} 
                    category={category}
                    categories={props.categories}
                    getCategories={props.getCategories}
                    filteredCategory={props.filteredCategory}
                    setFilteredCategory={props.setFilteredCategory}
                    filteredVideos={props.filteredVideos}
                    setFilteredVideos={props.setFilteredVideos}
                    {...props}
                />
            )}
        </section>
    )
}

export default CategoryList