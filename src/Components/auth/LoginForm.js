import React from 'react';
import dataManager from '../../modules/dataManager'

const LoginForm = props => {

    const handleLogin = event => {
        event.preventDefault();

        if (props.credentials.username === "" || props.credentials.password === "") {
            window.alert('Please complete all fields');
        } else {
            dataManager.getByProperty('users', 'username', props.credentials.username)
                .then(userArr => {
                    if (userArr.length <= 0) {
                        window.alert('Username does not exist')
                    } else if (props.credentials.password !== userArr[0].password) {
                        window.alert('Incorrect password')
                    } else {
                        props.setUser(userArr[0].id)
                        props.history.push('/videos')
                    }
                })
        }
    }

return (
    <article className='login-modal'>
        <form className='form-content'>

        <h3 className='form-title'>Login</h3>

        <div className='form-element'>
            <label htmlFor='username'>Username </label>
            <input onChange={props.handleSettingCredentials} type='text' id='username' />
        </div>

        <div className='form-element'>
            <label htmlFor='password'>Password </label>
            <input onChange={props.handleSettingCredentials} type='password' id='password' />
        </div>

        <div className='form-buttons'>
            <button type='submit' id='sign-up' onClick={handleLogin}>Log in</button>
            <button id='cancel' onClick={props.toggleLoginForm}>Cancel</button>
        </div>

        </form>
    </article>
)
}

export default LoginForm