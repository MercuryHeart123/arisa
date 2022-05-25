import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from "react-redux";
import axios from 'axios'

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
`
const NavLine = styled.div`
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: 1px solid black;
    width: 90%;
    margin: 0 auto 0 auto;
`

const Navbar = (props) => {
    const Logout = () => {
        axios.defaults.withCredentials = true;
        axios.post(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/logout`).then(() => {
            props.dispatch({
                type: 'logout',
                data: false
            })
        })
    }
    return (
        <Nav>
            <NavLink to={'/'}>Arisa.B</NavLink>
            {!props.username && <NavAuth to={'/login'}>Login</NavAuth>}
            {props.username && <NavAuth to={'/'} onClick={Logout}>Logout</NavAuth>}

            <NavWrapper>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/work1'}>Work1</NavLink>
                <NavLink to={'/work2'}>Work2</NavLink>
                <NavLink to={'/about'}>About</NavLink>
                {props.admin && <NavLink to={'/edit'}>Edit</NavLink>}
            </NavWrapper>

            <NavLine />
        </Nav>
    )
}

const mapStateToProps = (state) => {

    return {
        username: state.user.username,
        admin: state.user.admin,
    };
};
export default connect(mapStateToProps)(Navbar);