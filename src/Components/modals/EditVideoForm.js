import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager'

const EditVideoForm = props => {

    const [video, setVideo] = useState({videoTitle: '', url: '', categoryId: 0, userId: parseInt(sessionStorage.getItem('user')), id: props.videoId})
    const [category, setCategory] = useState({categoryTitle: "", userId: parseInt(sessionStorage.getItem('user'))})
    const [isLoading, setIsLoading] = useState(false);

    const getVideo = () => {
        return dataManager.get('videos', props.videoId)
        .then(video => setVideo(video))
    }

    useEffect(() => {
        getVideo();
    }, [])

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
    const handleEditVideo = event => {
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
            dataManager.update('videos', video)
            .then(updatedVideo => {
                dataManager.getWithEmbed('categories', updatedVideo.categoryId, 'videos')
                .then(embeddedCategory => {
                    if (props.match.params.hasOwnProperty('categoryTitle')) {

                        // Adding video to category of current page or from 'All videos'
                        if (props.match.params.categoryTitle === embeddedCategory.categoryTitle) {
                            props.setFilteredVideos(embeddedCategory.videos)
                            props.toggleEditVideoForm();

                        // Adding video to category of different page
                        } else {
                            props.history.push(`/videos/${category.categoryTitle}`)
                            props.toggleEditVideoForm();
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
                    const videoToUpdate = {...video}
                    videoToUpdate.categoryId = createdCategory.id
                    dataManager.update('videos', videoToUpdate)
                    .then(updatedVideo => {
                        dataManager.get('categories', updatedVideo.categoryId)
                        .then(category => {
                            props.history.push(`/videos/${category.categoryTitle}`)
                            props.toggleEditVideoForm();
                        })
                    })
                })
                }
            };
        };

    useEffect(() => {props.getCategories()});

return (
    <article className='edit-video-modal'>
        <form className='form-content'>
            <h3 className='form-title'>Edit Video</h3>
            <hr />

            <div className='form-element'>
                <label htmlFor='videoTitle'>Title</label>
                <input onChange={handleSettingVideo} value={video.videoTitle} type='text' id='videoTitle' />
            </div>

            <fieldset className='form-element'>
                <legend>Category</legend>
                <div className='fieldset-element__top'>
                    <select value={video.categoryId} id="categoryId" onChange={handleSettingVideo}>
                        <option value={0}>Choose category</option>
                        {props.categories.map(mappedCategory => <option key={mappedCategory.id} value={mappedCategory.id}>{mappedCategory.categoryTitle}</option>)}
                    </select>
                </div>

                <span className='fieldset-element'>or</span>
                <div className='fieldset-element'>
                    <label htmlFor='newCategory'>New category</label>
                    <input onChange={handleSettingCategory} type='text' placeholder='New category' id='categoryTitle' />
                </div>
            </fieldset>

            <div className='form-buttons'>
                <button type='submit' disabled={isLoading} id='addVideo' onClick={handleEditVideo}>Edit</button>
                <button id='cancel' disabled={isLoading} onClick={props.toggleEditVideoForm}>Cancel</button>
            </div>
        </form>
    </article>
)
}

export default EditVideoForm