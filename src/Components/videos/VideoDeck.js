import React from 'react'
import VideoCard from './VideoCard'

const VideoDeck = props => {
    
    return (
        <div className='videoDeck'>
            <p>{props.category.categoryTitle}</p><button>Edit</button><button>Delete</button>
            {props.videos.filter(filteredVideo => filteredVideo.categoryId === props.category.id).map(mappedVideo => 
                <VideoCard key={mappedVideo.id} video={mappedVideo}/>
            )
            }
        </div>
    )
}

export default VideoDeck