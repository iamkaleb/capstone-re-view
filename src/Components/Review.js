import React, {useState} from 'react';
import Welcome from './auth/Welcome'
import ApplicationViews from './ApplicationViews';

const Review = () => {
    const isAuthenticated = () => sessionStorage.getItem('user') !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const setUser = user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setHasUser(isAuthenticated());
    }

    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const [showLoginForm, setShowLoginForm] = useState(false);

    return (
        <>
            {!hasUser
            ? <Welcome
                setUser={setUser}
                hasUser={hasUser}
                showSignUpForm={showSignUpForm}
                showLoginForm={showLoginForm}
                setShowSignUpForm={setShowSignUpForm}
                setShowLoginForm={setShowLoginForm}
            />
            : <ApplicationViews />}
        </>
    );
};

export default Review