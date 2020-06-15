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

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {!hasUser
            ? <Welcome
                setUser={setUser}
                hasUser={hasUser}
                showModal={showModal}
                setShowModal={setShowModal}
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