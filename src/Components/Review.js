import React, {useState} from 'react';
import Welcome from './auth/Welcome'
import ApplicationViews from './ApplicationViews';
import CategoryList from './CategoryList';

const Review = () => {
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const setUser = user => {
        sessionStorage.setItem('credentials', JSON.stringify(user));
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
            : null}
            {hasUser
            ? <ApplicationViews />
            : null}
            {hasUser
            ? <CategoryList />
            : null}
        </>
    );
};

export default Review