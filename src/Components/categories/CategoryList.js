import React, {useEffect} from 'react'
import CategoryCard from './CategoryCard'
import '../css/Sidebar.css'

const CategoryList = props => {
    
    useEffect(() => {
        props.getCategories();
    }, [])

    return (
        <section className='sidebar'>
                <h3 className='category'>Categories</h3>
                <hr />
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