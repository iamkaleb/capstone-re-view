import React, {useState, useEffect} from 'react';
import dataManager from '../../modules/dataManager';

const DeleteVideoConfirm = props => {

    const [video, setVideo] = useState({})

    const getVideo = () => {
        dataManager.get('videos', props.videoId)
        .then(video => setVideo(video))
    }

    useEffect(() => {
        getVideo();
    }, [])

    const deleteVideo = () => {
        dataManager.delete('videos', video.id)
        .then(() => {
            if (props.match.params.hasOwnProperty('categoryTitle')) {
                props.getFilteredVideos();
                props.toggleDeleteVideoConfirm();
            } else {
                    props.getVideosAndCategories();
                    props.toggleDeleteVideoConfirm();
            }
        })
    }

    return (
        <article className='modal'>
            <p>Delete {video.videoTitle}?</p>
            <button type='button' onClick={deleteVideo}>Delete</button>
            <button type='button' onClick={props.toggleDeleteVideoConfirm}>Cancel</button>
        </article>

    )
}

export default DeleteVideoConfirm