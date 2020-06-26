import React from 'react'

const VideoCard = props => {
    
    const imagePath = () => {
        const pathId = props.video.url.split('v=')[1]
        return `https://img.youtube.com/vi/${pathId}/0.jpg`
    }

    return (
        <div className='video-card'>
            <div className='video-card-content'>
                    <div className='card-body' onClick={() => props.history.push(`/videos/${props.categoryTitle}/${props.video.id}`)}>
                        <img src={imagePath()} width={250} alt='thumbnail' />
                        <h4>{props.video.videoTitle}</h4>
                    </div>

                    <div className='card-buttons'>
                        <button onClick={() => props.toggleEditVideoForm(props.video.id)} type='button'>Edit</button>
                        <button onClick={() => props.toggleDeleteVideoConfirm(props.video.id)} type='button'>Delete</button>
                    </div>
            </div>
        </div>
    )
}

export default VideoCard