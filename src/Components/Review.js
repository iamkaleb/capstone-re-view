import React, {useState} from 'react';
import ApplicationViews from './ApplicationViews'

const Review = () => {

    const isAuthenticated = () => sessionStorage.getItem('user') !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const setUser = user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setHasUser(isAuthenticated());
    }

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
      }

    return <ApplicationViews 
                hasUser={hasUser} 
                setUser={setUser}
                clearUser={clearUser}
            />
};

export default Review