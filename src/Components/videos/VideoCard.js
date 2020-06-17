import React from 'react'

const VideoCard = props => {
    
    return (
        <div className='videoCard'>
            <p>{props.video.videoTitle}</p>
        </div>
    )
}

export default VideoCard