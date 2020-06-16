import React from 'react';
import dataManager from '../../modules/dataManager'

const LoginForm = props => {

    const handleLogin = event => {
        event.preventDefault();

        if (props.credentials.username === "" || props.credentials.password === "") {
            window.alert('Please complete all fields');
        } else {
            dataManager.getUsername(props.credentials.username)
                .then(userArr => {
                    if (userArr.length < 0) {
                        window.alert('Username does not exist')
                    } else if (props.credentials.password !== userArr[0].password) {
                        window.alert('Incorrect password')
                    } else {
                        props.setUser(props.credentials)
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

            <button type='submit' id='sign-up' onClick={handleLogin}>Log in</button>
            <button id='cancel' onClick={props.toggleModal}>Cancel</button>
        </form>
    </>
)
}

export default LoginForm