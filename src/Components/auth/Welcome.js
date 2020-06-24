import React, {useState} from 'react'
import {createPortal} from 'react-dom';
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

const Welcome = props => {
    
    const [credentials, setCredentials] = useState({username: "", password: ""})
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
        
    const handleSettingCredentials = event => {
        const stateToChange = {...credentials};
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    };

    const toggleSignUpForm = () => {
        showSignUpForm ? setShowSignUpForm(false) : setShowSignUpForm(true)
    }

    const toggleLoginForm = () => {
        showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true)
    }

    const modalDiv = document.getElementById('modal');

    return (
        <article id='welcomePage'>
            <section id='welcomeContent'>
                <h1>Re-view</h1>
                {showSignUpForm
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
                <button id='signUpButton' type="button" disabled={showLoginForm || showSignUpForm} onClick={toggleSignUpForm}>Sign up</button>
                {showLoginForm
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
                <button id='loginButton' type="button" disabled={showLoginForm || showSignUpForm} onClick={toggleLoginForm}>Log in</button>
            </section>
        </article>
    )
}

export default Welcome