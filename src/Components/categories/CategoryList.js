import React, {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'
import CategoryForm from './CategoryForm'
import dataManager from '../../modules/dataManager'

const CategoryList = props => {

    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const getCategories = () => {
        return dataManager.getByProperty('categories', 'userId', parseInt(sessionStorage.getItem('user')))
        .then(categoriesArr => props.setCategories(categoriesArr.sort((a, b) => (a.categoryTitle > b.categoryTitle) ? 1 : -1)))
    }

    useEffect(() => {
        getCategories();
    }, [])

    const toggleCategoryForm = () => {
        showCategoryForm ? setShowCategoryForm(false) : setShowCategoryForm(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <>
            <h1>Categories</h1>
            {showCategoryForm
                ? createPortal(<CategoryForm
                                    categories={props.categories}
                                    getCategories={getCategories}
                                    toggleCategoryForm={toggleCategoryForm}
                                />, modalDiv)
                : null
            }
            <button type="button" onClick={toggleCategoryForm}>New category</button>
            {props.categories.map(category =>
                <p key={category.id}>{category.categoryTitle}</p>
            )}
        </>
    )
}

export default CategoryList