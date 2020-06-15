import React from 'react';

const SignUpForm = () => {

return (
    <>
        <form>
            <label for='username'>Username </label>
            <input type='text' id='username' />

            <label for='password'>Password </label>
            <input type='text' id='password' />

            <label for='confirmpassword'>Confirm Password </label>
            <input type='text' id='confirmpassword' />

            <button id='sign-up'>Sign up</button>
        </form>
    </>
)
}

export default SignUpForm