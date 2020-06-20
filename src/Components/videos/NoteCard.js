import React from 'react'
import Duration from '../Duration'

const NoteCard = props => {

    return (
        <section>
            <Duration seconds={props.displayNote.timestamp} />
            <h1>{props.displayNote.noteTitle}</h1>
            <p>{props.displayNote.noteContent}</p>
        </section>

    )
}

export default NoteCard