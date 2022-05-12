import React from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem, Glyphicon, Tooltip, OverlayTrigger,
   } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Content.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';
function NavBar() {
 return (
 <Navbar>
    <Navbar.Header>
        <Navbar.Brand>My Company Inventory</Navbar.Brand>
    </Navbar.Header>
    <Nav>
        <LinkContainer exact to="/">
        <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/products">
        <NavItem>Product List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
        <NavItem>Report</NavItem>
        </LinkContainer>
    </Nav>
    <Nav pullRight>
        <ProductAddNavItem />
        <NavDropdown
        id="user-dropdown"
        title={<Glyphicon glyph="option-vertical" />}
        noCaret
        >
        <MenuItem>About</MenuItem>
        </NavDropdown>
    </Nav>
 </Navbar>
 );
}

export default function Page() {
    return (
    <div>
    <NavBar />
    <Contents />
    {/* <Footer/> */}
    </div>
    );
   }