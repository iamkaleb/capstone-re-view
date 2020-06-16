import React from 'react'
import {createPortal} from 'react-dom';
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

const Welcome = props => {
    
    const toggleSignUpForm = () => {
        props.showSignUpForm ? props.setShowSignUpForm(false) : props.setShowSignUpForm(true)
    }

    const toggleLoginForm = () => {
        props.showLoginForm ? props.setShowLoginForm(false) : props.setShowLoginForm(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <>
            <h1>Re-view</h1>
            {props.showSignUpForm
            ? createPortal(<SignUpForm 
                                toggleSignUpForm={toggleSignUpForm} 
                                setUser={props.setUser} 
                                hasUser={props.hasUser}
                            />, modalDiv)
            : null
            }
            <button type="button" onClick={toggleSignUpForm}>Sign up</button>
            {props.showLoginForm
            ? createPortal(<LoginForm 
                                toggleLoginForm={toggleLoginForm} 
                                setUser={props.setUser} 
                                hasUser={props.hasUser}
                            />, modalDiv)
            : null
            }
            <button type="button" onClick={toggleLoginForm}>Log in</button> 
        </>
    )
}

export default Welcome