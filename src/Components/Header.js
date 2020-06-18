import React from 'react'
import './css/Header.css'
import {Link} from "react-router-dom";

const Header = props => {
    
    const handleLogout = () => {
        props.clearUser();
      }

    return (
        <header>
            <Link to='/'>
                <h2 className='logo'>Re-view</h2>
            </Link>
                <h3 className='logout' onClick={handleLogout}>Log out</h3>
        </header>
    )
}

export default Header