import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse} from 'reactstrap';

const HeaderNav = () => {
    return (
        <Navbar className="bg-black" dark expand="md">
            <Link to="/Login" className="navbar-brand" >Ride for life</Link>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="/Driver" className="nav-link">Driver</Link>
                </NavItem>
                <NavItem>
                    <Link to="/Profile" className="nav-link">Profile</Link>
                </NavItem>
                <NavItem>
                    <Link to="/Login" className="nav-link">Logout</Link>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default HeaderNav;