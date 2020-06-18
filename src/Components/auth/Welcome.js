import React, {useState} from 'react'
import {createPortal} from 'react-dom';
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

const Welcome = props => {
    
    const [credentials, setCredentials] = useState({username: "", password: ""})
        
    const handleSettingCredentials = event => {
        const stateToChange = {...credentials};
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    };

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
                                credentials={credentials}
                                setCredentials={setCredentials}
                                handleSettingCredentials={handleSettingCredentials}
                                toggleSignUpForm={toggleSignUpForm} 
                                setUser={props.setUser} 
                                hasUser={props.hasUser}
                                {...props}
                            />, modalDiv)
            : null
            }
            <button type="button" onClick={toggleSignUpForm}>Sign up</button>
            {props.showLoginForm
            ? createPortal(<LoginForm
                                credentials={credentials}
                                handleSettingCredentials={handleSettingCredentials}
                                toggleLoginForm={toggleLoginForm} 
                                setUser={props.setUser} 
                                hasUser={props.hasUser}
                                {...props}
                            />, modalDiv)
            : null
            }
            <button type="button" onClick={toggleLoginForm}>Log in</button> 
        </>
    )
}

export default Welcome