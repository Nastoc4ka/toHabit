import React from 'react';
import {Link} from 'react-router-dom'
import './footer.css';
import {Nav, Navbar} from "react-bootstrap";
import moment from "moment";

const Footer = ({isLoggedIn, logout}) => {
    return (<Navbar bg="light" variant="light" className='footer'>
        <Navbar.Brand>
            <Link to='/' className='toHabitFooter'>
                <div>{`© ${moment().format('YYYY')} ToHabit`}</div>
            </Link>
            <span className='email'>
                <label>E-mail:</label><a href='mailto:anastsiyabelitskaya@gmail.com'> anastsiyabelitskaya@gmail.com</a>
            </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
            <Link className='mr-2 footerRight' to='/about'>About</Link>
            {isLoggedIn && <Nav className='justify-content-end'>
                <Link className='mr-2 footerRight' to='/' onClick={logout}>Log Out</Link>
            </Nav>}
        </Navbar.Collapse>
    </Navbar>)
};

export default Footer;