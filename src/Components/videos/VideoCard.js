import React from 'react'
import { Link } from "react-router-dom";

const VideoCard = props => {
    
    return (
        <div className='video-card'>
            <div className='video-card-content'>
                <Link to={`/videos/${props.category.categoryTitle}/${props.video.id}`}>
                    <h4>{props.video.videoTitle}</h4>
                </Link>
            </div>
        </div>
    )
}

export default VideoCard