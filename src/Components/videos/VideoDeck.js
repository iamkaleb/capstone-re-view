import React from 'react'
import VideoCard from './VideoCard'

const VideoDeck = props => {
    
    return (
        <section className='video-deck'>
            <div className='category-title'>
                <h4>{props.category.categoryTitle}</h4><p>Edit</p><p>Delete</p>
            </div>
            <hr />
            <div className='video-list'>
            {props.videos.filter(filteredVideo => filteredVideo.categoryId === props.category.id).map(mappedVideo => 
                <VideoCard key={mappedVideo.id} video={mappedVideo}/>
            )}
            </div>
        </section>
    )
}

export default VideoDeck