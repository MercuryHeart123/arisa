import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    text-align: center;
    padding: 1rem 0;
`
const NavWrapper = styled.div`
padding: 1rem 0;

`
const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 0 40px;
    padding: 0 10px;
    &.active{
        color: gray;
    }
`
const NavAuth = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 0 40px;
    padding: 0 10px;
    position: absolute;
    right:0;

    &.active{
        color: gray;
    }
`

const Navbar = () => {
    return (
        <Nav>
            <NavLink to={'/'}>Arisa.B</NavLink>
            <NavAuth to={'/login'}>Login</NavAuth>
            <NavWrapper>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/work1'}>Work1</NavLink>
                <NavLink to={'/work2'}>Work2</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </NavWrapper>
        </Nav>
    )
}

export default Navbar