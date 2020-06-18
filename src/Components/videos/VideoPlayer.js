import React, { useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import dataManager from '../../modules/dataManager'

const VideoPlayer = props => {
    
    const [video, setVideo] = useState({'videoTitle': '', 'url': ''});
    const [playing, setPlaying] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dataManager.getByProperty('videos', 'id', props.videoId)
        .then(video => {
            setVideo({
                'videoTitle': video.VideoTitle,
                'url': video.url
            })
            setIsLoading(false)
        })
    }, [props.videoId]);

    return (
        <>
            <ReactPlayer
                    className="react-player"
                    url={video.url}
                    playing={playing}
                    controls
                />
        </>
    )
}

export default VideoPlayer