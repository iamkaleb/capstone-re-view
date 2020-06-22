import React from 'react'
import './css/Header.css'

const Header = props => {
    
    const handleLogout = () => {
        props.clearUser();
      }

    return (
        <header>
                <h2 disabled={props.showLoginForm || props.showCategoryForm} onClick={() => props.history.push('/videos')}className='logo'>Re-view</h2>
                <h3 className='logout' disabled={props.showLoginForm || props.showCategoryForm} onClick={handleLogout}>Log out</h3>
        </header>
    )
}

export default Header