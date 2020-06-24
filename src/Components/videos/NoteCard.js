import React from 'react'
import Duration from '../Duration'

const NoteCard = props => {

    return (
        <section className='note-card'>
            <Duration className='note-card__timestamp' seconds={props.displayNote.timestamp}/><p onClick={props.toggleEdit} className='note-card__edit'>Edit</p><p onClick={() => props.deleteNote(props.displayNote.id)} className='note-card__delete'>Delete</p>
            <h1 className='note-card__title'>{props.displayNote.noteTitle}</h1>
            <p className='note-card__content'>{props.displayNote.noteContent}</p>
        </section>

    )
}

export default NoteCard