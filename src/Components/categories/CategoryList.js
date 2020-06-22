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
                    {...props}
                />
            )}
        </section>
    )
}

export default CategoryList