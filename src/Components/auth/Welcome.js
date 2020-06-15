import React, {useState} from 'react'
import ReactDOM from 'react-dom';
// import ToggleContent from '../ToggleContent'
import Modal from '../Modal'
// import SignUpForm from './SignUpForm'

const Welcome = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }

    const modalRoot = document.getElementById('modal');

    const Outsider = () => {
        ReactDOM.createPortal(<Modal />, modalRoot)
    }
    return (
        <>
            <h1>Re-view</h1>
            <Outsider onClose={toggleModal}/>
            <button type="button" onClick={toggleModal}>Sign up</button>
        </>
    )
}

export default Welcome