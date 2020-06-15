import React from 'react';
import './Modal.css'
import { createPortal } from 'react-dom';

const Modal = ({children, onClose, open}) => {

    const modalRoot = document.getElementById('modal');

    open
        ? createPortal(
            <div className='modal'>
                <div className='modal_close' onClick={onClose}>&times;</div>
                {children}
            </div>,
            modalRoot
        )
        : null
    // return (
    //     <>
    //         <form className="modal">
    //             <label for='username'>Username </label>
    //             <input type='text' id='username' />

    //             <label for='password'>Password </label>
    //             <input type='text' id='password' />

    //             <label for='confirmpassword'>Confirm Password </label>
    //             <input type='text' id='confirmpassword' />

    //             <button id='sign-up'>Sign up</button>
    //         </form>
    // </>
    // )
}

export default Modal