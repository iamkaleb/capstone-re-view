import React, {useState} from 'react';
import dataManager from '../../modules/dataManager'

const SignUpForm = props => {

    const [confirmPass, setConfirmPass] = useState("")

    const handleSettingConfirmPass = event => {
        let stateToChange = ""
        stateToChange = event.target.value;
        setConfirmPass(stateToChange)
    }

    const handleSignUp = event => {
        event.preventDefault();

        if (props.credentials.username === "" || props.credentials.password === "" || confirmPass === "") {
            window.alert('Please complete all fields');
        } else if (props.credentials.password !== confirmPass) {
            window.alert('Passwords do not match');
        } else {
            dataManager.getUsername(props.credentials.username)
                .then(userArr => {
                    if (userArr.length > 0) {
                        window.alert('Username is unavailable')
                    } else {
                        dataManager.post('users', props.credentials)
                        .then(props.setUser(props.credentials))
                    }
                })
        }
    }

return (
    <>
        <form>
            <label htmlFor='username'>Username </label>
            <input onChange={props.handleSettingCredentials} type='text' id='username' />

            <label htmlFor='password'>Password </label>
            <input onChange={props.handleSettingCredentials} type='text' id='password' />

            <label htmlFor='confirmPassword'>Confirm Password </label>
            <input onChange={handleSettingConfirmPass} type='text' id='confirmPassword' />

            <button type='submit' id='sign-up' onClick={handleSignUp}>Sign up</button>
            <button id='cancel' onClick={props.toggleModal}>Cancel</button>
        </form>
    </>
)
}

export default SignUpForm