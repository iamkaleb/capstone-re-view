import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager';

const DeleteCategoryConfirm = props => {

    const [category, setCategory] = useState({})

    const getCategory = () => {
        dataManager.get('categories', props.categoryId)
        .then(category => setCategory(category))
    }

    useEffect(() => {
        getCategory();
    }, [])

    const deleteCategory = () => {
        dataManager.delete('categories', category.id)
        .then(() => {
            if (props.match.params.hasOwnProperty('categoryTitle')) {
                props.history.push('/videos')
            } else {
                    props.getCategories();
                    props.getVideosAndCategories();
                    props.toggleDeleteCategoryConfirm();
            }
        })
    }

    return (
        <article className='confirmation-modal'>
            <form className='form-content'>
                <h3 className='form-title'>Delete {category.categoryTitle} and all related videos?</h3>

                <div className='form-buttons'>
                    <button type='button' onClick={deleteCategory}>Delete</button>
                    <button type='button' onClick={props.toggleDeleteCategoryConfirm}>Cancel</button>
                </div>
            
            </form>
        </article>

    )
}

export default DeleteCategoryConfirm