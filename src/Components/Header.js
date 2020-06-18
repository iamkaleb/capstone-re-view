import React from 'react'
import './css/Header.css'

const Header = props => {
    
    const handleLogout = () => {
        props.clearUser();
      }

    return (
        <header>
                <h2 className='logo'>Re-view</h2>
                <h3 className='logout' onClick={handleLogout}>Log out</h3>
        </header>
    )
}

export default Header