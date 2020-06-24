import React, { useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'
import dataManager from '../../modules/dataManager'
import '../css/Player.css'
import Duration from '../Duration'
import NoteCard from './NoteCard'

const VideoPlayer = props => {
    // States
    const [playing, setPlaying] = useState(true);
    const [video, setVideo] = useState({ videoTitle: '', url: '' });
    const [notes, setNotes] = useState([]);
    const [formNote, setFormNote] = useState({ noteTitle: '', noteContent: '', timestamp: 0, videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user'))});
    const [displayNote, setDisplayNote] = useState({noteTitle: '', noteContent: '', timestamp: null, videoId: props.videoId, userId: parseInt(sessionStorage.getItem('user'))});
    const [isLoading, setIsLoading] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [edit, setEdit] = useState(false);

    // Load video player w/ url after first render
    useEffect(() => {
        dataManager.getByProperty('videos', 'id', props.match.params.videoId)
        .then(videoArr => {
            setVideo({
                videoTitle: videoArr[0].videoTitle,
                url: videoArr[0].url
            })
        })
    }, [props.match.params.videoId]);

    // Fetch notes from DB and set notes after first render
    useEffect(() => {
        getNotes();
    }, []);

    // When played state is updated, locate any matching note.timestamp from notes (if there is one) and set displayNote
    useEffect(() => {
        const time = notes.find(note => note.timestamp === played)
        if (time !== undefined) {
            setDisplayNote(time)
        }
    }, [played]);

    // Ref for directly manipulating ReactPlayer
    const player = useRef();

    // Set formNote based on noteForm inputs
    const handleFieldChange = event => {
        const stateToChange = {...formNote}
        stateToChange[event.target.id] = event.target.value;
        setFormNote(stateToChange);
    };

    // Set formNote.timestamp using getCurrentTime() ref method
    const getTimestamp = () => {
        setIsLoading(true)
        const newNote = {...formNote}
        newNote.timestamp = Math.floor(player.current.getCurrentTime())
        setFormNote(newNote)
        setIsLoading(false)
    };

    // If note form validation passes: Edit: put/update form note / New note: post form note to DB. Get notes.
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
                    if (edit) {
                        dataManager.update('notes', formNote)
                        .then(getNotes)
                        .then(() => {
                            clearForm();
                            setIsLoading(false)
                        })
                    } else {
                    dataManager.post('notes', formNote)
                        .then(getNotes)
                        .then(() => {
                            clearForm();
                            setIsLoading(false)
                        })
                    }
                }
            })
        }
    };

    // Set played state based on progressInterval prop on ReactPlayer
    const updatePlayed = progress => {
        setPlayed(Math.floor(progress.playedSeconds))
    };

    // Set duration state when ReactPlayer loads url
    const getDuration = duration => {
        setDuration(duration);
    };

    // Fetch notes for this video from DB and set notes
    const getNotes = () => {
        return dataManager.getByProperty('notes', 'videoId', props.videoId)
                .then(notes => {
                    setNotes(notes)
                })
    };

    const toggleEdit = () => {
        if (displayNote.hasOwnProperty('id')) {
            setFormNote(displayNote);
            if (!edit) {
                setEdit(true)
            };
        };
    };

    // Delete displayed note from DB, clear display note, and set notes
    const deleteNote = id => {
        dataManager.delete('notes', id)
        .then(() => {

            setDisplayNote(
                {noteTitle: '', 
                noteContent: '', 
                timestamp: null, 
                videoId: props.videoId, 
                userId: parseInt(sessionStorage.getItem('user'))});

            dataManager.getByProperty('notes', 'videoId', props.match.params.videoId)
            .then(notes => {
                    setNotes(notes)
                })
        })
    };

    // Clear form note
    const clearForm = () => {
        setFormNote(
            {noteTitle: '', 
            noteContent: '', 
            timestamp: 0, 
            videoId: props.videoId, 
            userId: parseInt(sessionStorage.getItem('user'))}
        );

        if (edit) {
            setEdit(false)
        }
    }



    return (
        <article className='video-player'>
            <ReactPlayer
                    className="react-player"
                    url={video.url}
                    playing={playing}
                    controls
                    ref={player}
                    onProgress={updatePlayed}
                    onDuration={getDuration}
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

                <p id='formLabel'>
                {edit
                ? 'Edit note'
                : 'New note'}
                </p>

                <button
                    id='noteSubmit'
                    type='submit'
                    onClick={constructNote}
                    disabled={isLoading}
                >
                {edit
                ? 'Edit'
                : 'Submit'}
                </button>

                <button
                    id='clearForm'
                    type='button'
                    onClick={clearForm}
                >Clear</button>

                <button
                    id='getTimestamp'
                    type='button'
                    onClick={getTimestamp}
                >Time</button>

                <Duration seconds={formNote.timestamp} className='timestamp'/>
            </form>

            <NoteCard displayNote={displayNote} deleteNote={deleteNote} toggleEdit={toggleEdit}/>

            <section id="noteList">
                {notes.sort((a, b) => a.timestamp - b.timestamp).map(note => {
                    return <div className="note" key={note.id}>
                                <button className='note-list__timestamp' type="button" onClick={() => player.current.seekTo(note.timestamp)}><Duration seconds={note.timestamp}/></button><p className='note-list__note'>{note.noteTitle}</p>
                            </div>
                        })}
            </section>
        </article>
    )
}

export default VideoPlayer