import React from 'react';
import {NavLink} from 'react-router-dom';
import './header.css';
import '../../fonts/New_Tegomin/NewTegomin-Regular.ttf';
import {Nav, Navbar} from "react-bootstrap";
import {AiOutlineSchedule} from "react-icons/ai";
import {BsFileText} from "react-icons/bs";

const Header = ({isLoggedIn, user, logout}) => {
    return (
        <Navbar bg="light" variant="light" className='header'>
            <Navbar.Brand>
                <NavLink activeClassName="current" exact to='/' className='toHabit underline'>
                    <li>ToHabit</li>
                </NavLink>
            </Navbar.Brand>

            {isLoggedIn && <NavLink to='/statistics' activeClassName="current" className='headerLinks underline'>
                <li>
                    <span className='displayIcon'><AiOutlineSchedule/></span>
                    <span className='displayWord'>Statistics</span>
                </li>
            </NavLink>}
            <NavLink to='/about' activeClassName="current" className='headerLinks ml-3 underline'>
                <li>
                    <span className='displayIcon'><BsFileText/></span>
                    <span className='displayWord'>About</span>
                </li>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end rightHeader'>
                {isLoggedIn ?
                    <Nav className='justify-content-end'>
                        <span className='userName'>{`Hi, ${user.username}.`}</span>
                        <NavLink to="/" className='mr-2 ml-2' onClick={logout}>Log out</NavLink>
                    </Nav> :
                    <Nav className='justify-content-end'>
                        <NavLink to="/login" activeClassName="current" className='mr-2 underline'>
                            <li>Log In</li>
                        </NavLink>
                        <NavLink to="/register" activeClassName="current" className='underline'>
                            <li>Sign up</li>
                        </NavLink>
                    </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;