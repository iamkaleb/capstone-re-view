import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import CategoryForm from './CategoryForm'
import '../css/CategoryList.css'

const CategoryList = props => {

    const [showCategoryForm, setShowCategoryForm] = useState(false);
    
    useEffect(() => {
        props.getCategories();
    }, [])

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <section className='sidebar'>
            {showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={props.getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
                                />, modalDiv)
                : null
            }
            <p onClick={toggleCategoryForm}> &#x2b; New category</p>
            {props.categories.map(category =>
                <p key={category.id}>{category.categoryTitle}</p>
            )}
        </section>
    )
}

export default CategoryList