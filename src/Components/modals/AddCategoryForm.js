import React, {useState} from 'react';
import dataManager from '../../modules/dataManager'

const AddCategoryForm = props => {

    const [category, setCategory] = useState({"categoryTitle": "", "userId": parseInt(sessionStorage.getItem('user'))})
    const [isLoading, setIsLoading] = useState(false);

    const handleSettingCategory = event => {
        const stateToChange = {...category};
        stateToChange[event.target.id] = event.target.value;
        setCategory(stateToChange);
    };

    const handleAddCategory = event => {
        event.preventDefault();

        if (category.categoryTitle === "") {
            window.alert('Please give your category a title!');
        } else if (props.categories.some(stateCategory => stateCategory.categoryTitle === category.categoryTitle)){
            window.alert('That category already exists!')
        } else {
            dataManager.post('categories', category)
            .then(category => {
                props.toggleAddCategoryForm();
                props.history.push(`/videos/${category.categoryTitle}`)
            })
        }
    }

return (
        <article className='category-modal'>
            <form className='form-content'>

            <h3 className='form-title'>Add category</h3>

            <div className='form-element'>
                <input onChange={handleSettingCategory} type='text' id='categoryTitle' />
            </div>

            <div className='form-element'>
                <button type='submit' id='addCategory' onClick={handleAddCategory}>Add</button>
                <button id='cancel' onClick={props.toggleAddCategoryForm}>Cancel</button>
            </div>
            
            </form>
        </article>
)
}

export default AddCategoryForm