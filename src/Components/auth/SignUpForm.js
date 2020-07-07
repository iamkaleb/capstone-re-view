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
            dataManager.getByProperty('users', 'username', props.credentials.username)
                .then(userArr => {
                    if (userArr.length > 0) {
                        window.alert('Username is unavailable')
                    } else {
                        dataManager.post('users', props.credentials)
                        .then(() => {return dataManager.getByProperty('users', 'username', props.credentials.username)})
                        .then(userArr => {
                            props.setUser(userArr[0].id)
                            props.history.push('/videos')
                        })
                    }
                })
        }
    }

return (
    <article className='sign-up-modal'>
        <form className='form-content'>

        <h3 className='form-title'>Sign Up</h3>

        <div className='form-element'>
            <label htmlFor='username'>Username </label>
            <input onChange={props.handleSettingCredentials} type='text' id='username' />
        </div>

        <div className='form-element'>
            <label htmlFor='password'>Password </label>
            <input onChange={props.handleSettingCredentials} type='password' id='password' />
        </div>

        <div className='form-element'>
            <label htmlFor='confirmPassword'>Confirm Password </label>
            <input onChange={handleSettingConfirmPass} type='password' id='confirmPassword' />
        </div>

        <div className='form-buttons'>
            <button type='submit' id='sign-up' onClick={handleSignUp}>Sign up</button>
            <button id='cancel' onClick={props.toggleSignUpForm}>Cancel</button>
        </div>

        </form>
    </article>
)
}

export default SignUpForm