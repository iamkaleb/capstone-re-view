import React, { useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'
import dataManager from '../../modules/dataManager'
import '../css/Player.css'

const VideoPlayer = props => {
    
    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState({ videoTitle: '', url: '' });
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({ noteTitle: '', noteContent: '', timestamp: '', videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user')) });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dataManager.getByProperty('videos', 'id', props.videoId)
        .then(videoArr => {
            setVideo({
                videoTitle: videoArr[0].videoTitle,
                url: videoArr[0].url
            })
        })
    }, [props.videoId]);

    const player = useRef();

    const handleFieldChange = event => {
        const stateToChange = {...note}
        stateToChange[event.target.id] = event.target.value;
        setNote(stateToChange);
    };

    const getTimestamp = () => {
        let currentTime = player.current.getCurrentTime()
        let minutes = Math.floor(currentTime / 60)
        let seconds = ('0' + Math.floor(currentTime - minutes * 60)).slice(-2);

        const newNote = {...note}
        newNote.timestamp = `${minutes}:${seconds}`

        setNote(newNote)
    }

    const applyTimestamp = timestamp => {
        let minutes = parseInt(timestamp.split(":")[0])
        let seconds = parseInt(timestamp.split(":")[1])

        let targetTime = (minutes * 60) + seconds

        return player.current.seekTo(targetTime)
    }

    // Sorting function modified from RobNO's time sorting function found here: https://www.codeproject.com/articles/625832/how-to-sort-date-and-or-time-in-javascript
    function sortTimestamps(a, b) {
        let minutesA = parseInt(a.timestamp.split(":")[0])
        let minutesB = parseInt(b.timestamp.split(":")[0])

        let secondsA = parseInt(a.timestamp.split(":")[1])
        let secondsB = parseInt(b.timestamp.split(":")[1])       

        let results = minutesA > minutesB ? 1 : minutesA < minutesB ? -1 : 0

        if (results === 0) {
            results = secondsA > secondsB ? 1 : secondsA < secondsB ? -1 : 0
        }

        return results
    }

    const constructNote = event => {
        event.preventDefault();

        if (note.noteTitle === '') {
            window.alert('Please title your note!')
        } else if (note.timestamp === '') {
            window.alert('Press the "Time" button to timestamp your note!')
        } else {
            dataManager.getByProperty('notes', 'timestamp', note.timestamp)
            .then(noteArr => {
                if (noteArr > 0) {
                    window.alert('You already have a timestamp there!')
                } else {
                    setIsLoading(true);
                    const newNote = {...note}
                    newNote.timestamp =
                    dataManager.post('notes', newNote)
                        .then(getNotes)
                        .then(() => {
                            setNote({noteTitle: '', noteContent: '', timestamp: '', videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user'))});
                            setIsLoading(false)
                        })
                }
            })
        }
    };

    const getNotes = () => {
        return dataManager.getByProperty('notes', 'videoId', props.videoId)
                .then(notes => {
                    setNotes(notes)
                })
    };

    useEffect(() => {
        getNotes();
    }, []);


    return (
        <article className='video-player'>
            <ReactPlayer
                    className="react-player"
                    url={video.url}
                    playing={playing}
                    controls
                    ref={player}
                />
            <form id='noteForm'>
                <input 
                    id='noteTitle' 
                    type='text' 
                    placeholder='Note title' 
                    onChange={handleFieldChange}
                    value={note.noteTitle}
                />
                <textarea
                placeholder="Add note"
                id="noteContent"
                onChange={handleFieldChange}
                value={note.noteContent}
                name="noteContent"
                rows="4"
                cols="50"
                />
                <button
                    id='noteSubmit'
                    type='submit'
                    onClick={constructNote}
                >Submit</button>
                <button
                    id='getTimestamp'
                    type='button'
                    onClick={getTimestamp}
                >Time</button>
                <p id='timestamp'>{note.timestamp}</p>
            </form>
            <section id="noteList">
                {notes.sort(sortTimestamps).map(note => {
                    return <div className="note" key={note.id}>
                                <button type="button" onClick={() => applyTimestamp(note.timestamp)}>{note.timestamp}</button><p>{note.noteTitle}</p>
                            </div>
                        })}
            </section>
        </article>
    )
}

export default VideoPlayer