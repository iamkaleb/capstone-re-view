import React from 'react'
import VideoCard from './VideoCard'

const VideoDeck = props => {
    
    return (
        <section className='video-deck'>
            <div className='category-title__container'>
                <h3 className='category-title'>{props.category.categoryTitle}</h3><p className='category-title__button'>Edit</p><p className='category-title__button'>Delete</p>
            </div>
            <hr />
            <div className='video-list'>
            {props.videos.filter(filteredVideo => filteredVideo.categoryId === props.category.id).map(video => 
                <VideoCard 
                    categoryTitle={props.category.categoryTitle} 
                    key={video.id} 
                    video={video} 
                    {...props} 
                />
            )}
            </div>
        </section>
    )
}

export default VideoDeck