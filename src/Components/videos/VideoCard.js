import React from 'react'

const VideoCard = props => {
    
    return (
        <div className='video-card'>
            <div className='video-card-content'>
                    <h4 onClick={() => props.history.push(`/videos/${props.categoryTitle}/${props.video.id}`)}>{props.video.videoTitle}</h4>
                    <button onClick={() => props.toggleEditVideoForm(props.video.id)} type='button'>Edit</button>
                    <button onClick={() => props.toggleDeleteVideoConfirm(props.video.id)} type='button'>Delete</button>
            </div>
        </div>
    )
}

export default VideoCard