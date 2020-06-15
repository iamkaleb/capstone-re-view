import React from 'react'
import {createPortal} from 'react-dom';
import SignUpForm from './SignUpForm'

const Welcome = props => {
    const toggleModal = () => {
        props.showModal ? props.setShowModal(false) : props.setShowModal(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <>
            <h1>Re-view</h1>
            {props.showModal
            ? createPortal(<SignUpForm 
                                toggleModal={toggleModal} 
                                setUser={props.setUser} 
                                hasUser={props.hasUser}
                            />, modalDiv)
            : null
            }
            <button type="button" onClick={toggleModal}>Sign up</button>
        </>
    )
}

export default Welcome