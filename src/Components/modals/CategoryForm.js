import React, {useState} from 'react';
import dataManager from '../../modules/dataManager'

const CategoryForm = props => {

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
                props.history.push(`/videos/${category.categoryTitle}`)
                props.toggleCategoryForm();
            })
        }
    }

return (
    <>
        <form className='modal'>
            <label htmlFor='categoryTitle'>Add category</label>
            <input onChange={handleSettingCategory} type='text' id='categoryTitle' />

            <button type='submit' id='addCategory' onClick={handleAddCategory}>Add</button>
            <button id='cancel' onClick={props.toggleCategoryForm}>Cancel</button>
        </form>
    </>
)
}

export default CategoryForm