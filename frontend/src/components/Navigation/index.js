import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import UploadButton from './UploadButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ul id='user-left-nav'>
                    <li id='user-flickor-li'>
                        <NavLink exact to="/">flickor</NavLink>
                    </li>
                    <li id='your-photos'>
                        <NavLink to='/photos'>Your Photos</NavLink>
                    </li>
                </ul>
                <ul id='user-right-nav'>
                    <li id='nav-upload-btn'>
                        <UploadButton />
                    </li>
                    <li id='profile-btn'>
                        <ProfileButton user={sessionUser} />
                    </li>
                </ul>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <li id='nonuser-flickor-li'>
                    <NavLink exact to="/">flickor</NavLink>
                </li>
                <ul id='nonuser-btns'>
                    <li id='nav-login-li'>
                        <NavLink to="/login">Log In</NavLink>
                    </li>
                    <li id='nav-signup-li'>
                        <NavLink to="/signup">
                            <button id='nav-signup-btn'>Sign Up</button>
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            <ul id='nav-bar-ul'>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;