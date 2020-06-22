import React from 'react'
import './css/Header.css'
import {Link} from "react-router-dom";

const Header = props => {
    
    const handleLogout = () => {
        props.clearUser();
      }

    return (
        <header>
                <h2 onClick={() => props.history.push('/videos')}className='logo'>Re-view</h2>
                <h3 className='logout' onClick={handleLogout}>Log out</h3>
        </header>
    )
}

export default Header