import React from 'react'
import './css/Header.css'

const Header = props => {
    
    const handleLogout = () => {
        props.clearUser();
      }

    return (
        <header>
                <h1 onClick={() => props.history.push('/videos')}className='logo'>Re-view</h1>
                <h3 className='logout' onClick={handleLogout}>Log out</h3>
        </header>
    )
}

export default Header