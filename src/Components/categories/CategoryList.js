import React, {useEffect} from 'react'
import CategoryCard from './CategoryCard'
import { Link } from "react-router-dom";
import '../css/Sidebar.css'

const CategoryList = props => {
    
    useEffect(() => {
        props.getCategories();
    }, [])

    return (
        <section className='sidebar'>
            <Link to={'/videos'}>
                <p className='category' onClick={props.unfilterVideos}>All Videos</p>
            </Link>
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