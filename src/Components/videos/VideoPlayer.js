import React, { useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'
import dataManager from '../../modules/dataManager'
import '../css/Player.css'
import Duration from '../Duration'
import NoteCard from './NoteCard'

const VideoPlayer = props => {
    
    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState({ videoTitle: '', url: '' });
    const [notes, setNotes] = useState([]);
    const [formNote, setFormNote] = useState({ noteTitle: '', noteContent: '', timestamp: 0, videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user')) });
    const [displayNote, setDisplayNote] = useState({noteTitle: '', noteContent: '', timestamp: null, videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user'))});
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
        const stateToChange = {...formNote}
        stateToChange[event.target.id] = event.target.value;
        setFormNote(stateToChange);
    };

    const getTimestamp = () => {
        const newNote = {...formNote}
        newNote.timestamp = Math.floor(player.current.getCurrentTime())

        setFormNote(newNote)
    }

    const constructNote = event => {
        event.preventDefault();

        if (formNote.noteTitle === '') {
            window.alert('Please title your note!')
        } else if (formNote.timestamp === 0) {
            window.alert('Press the "Time" button to timestamp your note!')
        } else {
            dataManager.getByProperty('notes', 'timestamp', formNote.timestamp)
            .then(noteArr => {
                if (noteArr > 0) {
                    window.alert('You already have a timestamp there!')
                } else {
                    setIsLoading(true);
                    dataManager.post('notes', formNote)
                        .then(getNotes)
                        .then(() => {
                            setFormNote({noteTitle: '', noteContent: '', timestamp: 0, videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user'))});
                            setIsLoading(false)
                        })
                }
            })
        }
    };

    const handleProgress = state => {
        console.log('onProgress', state)
        // // We only want to update time slider if we are not currently seeking
        // if (!this.state.seeking) {
        //   this.setState(state)
        // }
      }

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
                    onProgress={handleProgress}
                    progressInterval={1000}
                />
            <form id='noteForm'>
                <input 
                    id='noteTitle' 
                    type='text' 
                    placeholder='Note title' 
                    onChange={handleFieldChange}
                    value={formNote.noteTitle}
                />
                <textarea
                placeholder="Add note"
                id="noteContent"
                onChange={handleFieldChange}
                value={formNote.noteContent}
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
                <Duration seconds={formNote.timestamp} className='timestamp'/>
            </form>
            <NoteCard displayNote={displayNote}/>
            <section id="noteList">
                {notes.sort((a, b) => a.timestamp - b.timestamp).map(note => {
                    return <div className="note" key={note.id}>
                                <button type="button" onClick={() => player.current.seekTo(note.timestamp)}><Duration seconds={note.timestamp}/></button><p>{note.noteTitle}</p>
                            </div>
                        })}
            </section>
        </article>
    )
}

export default VideoPlayer