import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager'

const EditCategoryForm = props => {

    const [category, setCategory] = useState({categoryTitle: '', userId: parseInt(sessionStorage.getItem('user')), id: props.categoryId})
    const [isLoading, setIsLoading] = useState(false);

    const getCategory = () => {
        return dataManager.get('categories', props.categoryId)
        .then(category => setCategory(category))
    }

    useEffect(() => {
        getCategory();
    }, [])

    const handleSettingCategory = event => {
        const stateToChange = {...category};
        stateToChange[event.target.id] = event.target.value;
        setCategory(stateToChange);
    };

    const handleEditCategory = event => {
        event.preventDefault();

        if (category.categoryTitle === "") {
            window.alert('Please give your category a title!');
        } else if (props.categories.some(stateCategory => stateCategory.categoryTitle === category.categoryTitle)){
            window.alert('That category already exists!')
        } else {
            dataManager.update('categories', category)
            .then(() => {
                if (props.match.params.hasOwnProperty('categoryTitle')) {
                    props.history.push(`/videos/${category.categoryTitle}`)
                    props.getCategories();
                    props.toggleEditCategoryForm();
                } else {
                        props.getCategories();
                        props.getVideosAndCategories();
                        props.toggleEditCategoryForm();
                };
            });
        };
    };

return (
    <article className='category-modal'>
        <form className='form-content'>

            <h3 className='form-title'>Edit category</h3>

            <div className='form-element'>
                <input onChange={handleSettingCategory} value={category.categoryTitle} type='text' id='categoryTitle'/>
            </div>

            <div className='form-buttons'>
                <button type='submit' id='editCategory' onClick={handleEditCategory}>Edit</button>
                <button id='cancel' onClick={props.toggleEditCategoryForm}>Cancel</button>
            </div>
        
        </form>
    </article>
)
}

export default EditCategoryForm