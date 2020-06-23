import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager'

const VideoForm = props => {

    const [video, setVideo] = useState({"videoTitle": "", "url": "", "categoryId": 0, "userId": parseInt(sessionStorage.getItem('user'))})
    const [category, setCategory] = useState({"categoryTitle": "", "userId": parseInt(sessionStorage.getItem('user'))})
    const [isLoading, setIsLoading] = useState(false);

    // Handle form inputs for new video
    const handleSettingVideo = event => {
        const stateToChange = {...video};
        if (event.target.id === 'categoryId') {
            stateToChange.categoryId = parseInt(event.target.value)
        } else {
        stateToChange[event.target.id] = event.target.value;
        }
        setVideo(stateToChange);
    };

    // Handle form inputs for new category
    const handleSettingCategory = event => {
        const stateToChange = {...category};
        stateToChange[event.target.id] = event.target.value;
        setCategory(stateToChange);
    };

    // Handle video form submit button
    const handleAddVideo = event => {
        event.preventDefault();

        // Title or URL incomplete
        if (video.videoTitle === "" || video.url === "") {
            window.alert('Please complete all fields!');

        // Neither existing category chosen nor new category created
        } else if (video.categoryId === 0 && category.categoryTitle === "") {
            window.alert('Please either choose an existing category or add a new one')

        // Both existing category chosen and new category created
        } else if (video.categoryId !== 0 && category.categoryTitle !== "") {
            window.alert('Please either choose an existing category or add a new one—not both!')

        // Existing category chosen
        } else if (video.categoryId !== 0) {
            setIsLoading(true)
            dataManager.post('videos', video)
            .then(postedVideo => {
                dataManager.getWithEmbed('categories', postedVideo.categoryId, 'videos')
                .then(embeddedCategory => {
                    if (props.match.params.hasOwnProperty('categoryTitle')) {

                        // Adding video to category of current page or from 'All videos'
                        if (props.match.params.categoryTitle === embeddedCategory.categoryTitle) {
                            props.toggleVideoForm();
                            props.setFilteredVideos(embeddedCategory.videos)

                        // Adding video to category of different page
                        } else {
                            props.toggleVideoForm();
                            props.history.push(`/videos/${category.categoryTitle}`)
                        };
                        
                    } else {
                        props.history.push(`/videos/${embeddedCategory.categoryTitle}`)
                    }
                });
            });

        // New category created
        } else if (category.categoryTitle !== "") {

            // User already has a category of that title
            if (props.categories.some(sommedCategory => sommedCategory.categoryTitle === category.categoryTitle)) {
                window.alert('That category already exists! Please choose it from the dropdown menu.')

            // New category and video
            } else {
                setIsLoading(true)
                dataManager.post('categories', category)
                .then(createdCategory => {
                    const newVideo = {...video}
                    newVideo.categoryId = createdCategory.id
                    dataManager.post('videos', newVideo)
                    .then(postedVideo => {
                        dataManager.get('categories', postedVideo.categoryId)
                        .then(category => props.history.push(`/videos/${category.categoryTitle}`))
                    })
                })
                }
            };
        };

    useEffect(() => {props.getCategories()});

return (
    <>
        <form className='modal'>
            <label>Add Video</label>

            <label htmlFor='videoTitle'>Title</label>
            <input onChange={handleSettingVideo} type='text' id='videoTitle' />
            
            <label htmlFor='url'>URL</label>
            <input onChange={handleSettingVideo} type='url' id='url' />

            <select value={video.categoryId} id="categoryId" onChange={handleSettingVideo}>
                <option value={0}>Choose category</option>
                {props.categories.map(mappedCategory => <option key={mappedCategory.id} value={mappedCategory.id}>{mappedCategory.categoryTitle}</option>)}
            </select>

            <input onChange={handleSettingCategory} type='text' placeholder='New category' id='categoryTitle' />

            <button type='submit' disabled={isLoading} id='addVideo' onClick={handleAddVideo}>Add</button>
            <button id='cancel' disabled={isLoading} onClick={props.toggleVideoForm}>Cancel</button>
        </form>
    </>
)
}

export default VideoForm