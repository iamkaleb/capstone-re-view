import React, {useState} from 'react';
import dataManager from '../../modules/dataManager'

const SignUpForm = props => {
    const [credentials, setCredentials] = useState({username:"", password: ""})
    const [confirmPass, setConfirmPass] = useState("")
    
    const handleSettingCredentials = event => {
        const stateToChange = {...credentials};
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    };

    const handleSettingConfirmPass = event => {
        let stateToChange = ""
        stateToChange = event.target.value;
        setConfirmPass(stateToChange)
    }

    const handleSignUp = event => {
        event.preventDefault();

        if (credentials.username === "" || credentials.password === "" || confirmPass === "") {
            window.alert('Please complete all fields');
        } else if (credentials.password !== confirmPass) {
            window.alert('Passwords do not match');
        } else {
            dataManager.getUsername(credentials.username)
                .then(user => {
                    if (user.length > 0) {
                        window.alert('Username is unavailable')
                    } else {
                        dataManager.post('users', credentials)
                        .then(props.setUser(credentials))
                    }
                })
        }
    }

return (
    <>
        <form>
            <label htmlFor='username'>Username </label>
            <input onChange={handleSettingCredentials} type='text' id='username' />

            <label htmlFor='password'>Password </label>
            <input onChange={handleSettingCredentials} type='text' id='password' />

            <label htmlFor='confirmPassword'>Confirm Password </label>
            <input onChange={handleSettingConfirmPass} type='text' id='confirmPassword' />

            <button type='submit' id='sign-up' onClick={handleSignUp}>Sign up</button>
            <button id='cancel' onClick={props.toggleModal}>Cancel</button>
        </form>
    </>
)
}

export default SignUpForm