import React from 'react'

const VideoCard = props => {
    
    return (
        <div className='video-card'>
            <div className='video-card-content'>
                    <h4 disabled={props.showLoginForm || props.showCategoryForm} onClick={() => props.history.push(`/videos/${props.categoryTitle}/${props.video.id}`)}>{props.video.videoTitle}</h4>
            </div>
        </div>
    )
}

export default VideoCard