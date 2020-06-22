import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager';

const DeleteCategoryConfirm = props => {

    const [categoryVideos, setCategoryVideos] = useState([]);

    const getCategoryVideos = () => {
        dataManager.getWithEmbed('categories', props.category.id, 'videos')
        .then(category => setCategoryVideos(category.videos))
    }

    useEffect(() => {
        getCategoryVideos();
    }, [])

    const deleteCategory = () => {
        Promise.all(dataManager.delete('categories', props.category.id), categoryVideos.map(video => dataManager.delete('videos', video.id)))
        .then(responses => Promise.all(responses.map(response => response.json())))
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
        <article className='delete-confirm'>
            <h3>Are you sure?</h3>
            <p>The following videos will also be deleted:</p>
            <ul>
                {props.videos.map(video => {
                    return <li>{video.videoTitle}</li>
                })
                }
            </ul>
            <p>Delete {props.category.categoryTitle} and all related videos?</p>
            <button type='button' onClick={deleteCategory}>Delete</button>
            <button type='button' onClick={props.toggleDeleteCategoryConfirm}>Cancel</button>
        </article>

    )
}

export default DeleteCategoryConfirm