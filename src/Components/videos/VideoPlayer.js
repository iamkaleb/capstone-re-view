import React, { useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import dataManager from '../../modules/dataManager'
import '../css/Player.css'

const VideoPlayer = props => {
    
    const [video, setVideo] = useState({ videoTitle: "", url: "" });
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        dataManager.getByProperty('videos', 'id', props.videoId)
        .then(videoArr => {
            setVideo({
                videoTitle: videoArr[0].videoTitle,
                url: videoArr[0].url
            })
        })
    }, [props.videoId]);

    return (
        <article className='video-player'>
            <ReactPlayer
                    className="react-player"
                    url={video.url}
                    playing={playing}
                    controls
                />
            <form className='annotation-form'>
                <input className='annotation-title' type='text' placeholder='Note title'/>
                <textarea
                className='annotation-content' 
                placeholder="Add note"
                id="noteContent"
                name="noteContent"
                rows="4"
                cols="50"
                />
                <br />
                <button
                    className='annotation-submit'
                    type="button"
                >Submit</button>
            </form>
        </article>
    )
}

export default VideoPlayer