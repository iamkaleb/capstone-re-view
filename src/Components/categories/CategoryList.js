import React, {useEffect} from 'react'

import '../css/Sidebar.css'

const CategoryList = props => {
    
    useEffect(() => {
        props.getCategories();
    }, [])

    return (
        <section className='sidebar'>
            {props.categories.map(category =>
                <p key={category.id}>{category.categoryTitle}</p>
            )}
        </section>
    )
}

export default CategoryList