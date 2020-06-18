import React from 'react'

const VideoCard = props => {
    
    return (
        <div className='video-card'>
            <div className='video-card-content'>
                <h4>{props.video.videoTitle}</h4>
            </div>
        </div>
    )
}

export default VideoCard