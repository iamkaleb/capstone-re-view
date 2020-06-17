import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager'

const VideoForm = props => {

    const [video, setVideo] = useState({"videoTitle": "", "url": "", "categoryId": null, "userId": parseInt(sessionStorage.getItem('user'))})
    const [category, setCategory] = useState({"categoryTitle": "", "userId": parseInt(sessionStorage.getItem('user'))})


    const handleSettingVideo = event => {
        const stateToChange = {...video};
        stateToChange[event.target.id] = event.target.value;
        setVideo(stateToChange);
    };

    const handleSettingCategory = event => {
        const stateToChange = {...category};
        stateToChange[event.target.id] = event.target.value;
        setCategory(stateToChange);
    };

    const handleAddVideo = event => {
        event.preventDefault();

        if (video.videoTitle === "" || video.url === "") {
            window.alert('Please complete all fields!');
        } else if (video.categoryId === null && props.category.categoryTitle === "") {
            window.alert('Please either choose an existing category or add a new one')
        } else if (video.categoryId !== null && props.category.categoryTitle !== "") {
            window.alert('Please either choose an existing category or add a new one—not both!')
        } else if (props.videos.some(stateVideo => stateVideo.videoTitle === video.videoTitle)){
            window.alert('A video by that name already exists!')
        } else if (video.categoryId !== null) {
            dataManager.post('videos', video)
            .then(() => {
                props.toggleVideoForm();
                props.getVideos();
            })
        } else if (category.categoryTitle !== "") {
            dataManager.post('categories', category)
            .then(() => {return dataManager.getByProperty('categories', 'categoryTitle', category.categoryTitle)})
            .then(categoryArr => {
                const stateToChange = {...video}
                stateToChange.categoryId = categoryArr[0].id
                dataManager.post('videos', video)})
            .then(() => {
                props.toggleVideoForm();
                props.getVideos();
            })
        };
    };

    useEffect(() => {props.getCategories()}, []);

return (
    <>
        <form>
            <label>Add Video</label>

            <label htmlFor='videoTitle'>Title</label>
            <input onChange={handleSettingVideo} type='text' id='videoTitle' />
            
            <label htmlFor='url'>URL</label>
            <input onChange={handleSettingVideo} type='url' id='url' />

            <select value={video.categoryId} id="categoryId" onChange={handleSettingVideo}>
                <option value={null}>Choose category</option>
                {props.categories.map(propsCategory => <option key={propsCategory.id} value={propsCategory.id}>{propsCategory.categoryTitle}</option>)}
            </select>

            <input onChange={handleSettingCategory} type='text' placeholder='New category' id='categoryTitle' />

            <button type='submit' id='addVideo' onClick={handleAddVideo}>Add</button>
            <button id='cancel' onClick={props.toggleVideoForm}>Cancel</button>
        </form>
    </>
)
}

export default VideoForm