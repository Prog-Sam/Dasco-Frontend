import React, { Fragment } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, onLogout }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          DASCO PLASTIC RECYCLING CORPORATION
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' className='nav-link'>
              PRODUCTS
            </Link>
            <Link to='/contactUs' className='nav-link'>
              CONTACT US
            </Link>
            <Link to='/aboutUs' className='nav-link'>
              ABOUT US
            </Link>
            {currentUser && (
              <Fragment>
            <Link to='/settings' className='nav-link'>
              SETTINGS
            </Link>
                <Link to='/updatePassword' className='nav-link'>
                  {currentUser.unique_name.toUpperCase()}
                </Link>
                <Link to='/#' className='nav-link' onClick={onLogout}>
                  LOGOUT
                </Link>
              </Fragment>
            )}
            {!currentUser && (
              <Link to='/login' className='nav-link'>
                LOGIN
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
