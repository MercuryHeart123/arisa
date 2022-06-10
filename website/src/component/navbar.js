import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from "react-redux";
import axios from 'axios'
import { BsCircleFill } from 'react-icons/bs'
const Nav = styled.div`
    text-align: center;
`

const NavLogoAndLink = styled.div`
    display:flex;
    position: relative;
    width:100%;

    font-family: 'Sofia', cursive !important;
`


const NavLogo = styled.div`
    width:30%;
    height: auto;
    display: flex;
    justify-content: center; 


    img{
        height:78.6px;
        margin: 0;
        padding: 0;
    }
`

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width:70%;
    
`
const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 0 40px;
    padding: 0 10px;
    /* &.active{
        color: gray;
    } */
`
const NavAuth = styled(Link)`
    color: black;
    text-decoration: none;

    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%,-50%);
`
const NavLine = styled.div`
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: 1px solid black;
    width: 90%;
    margin: 0 auto 0 auto;
`

const NavDot = styled.div`
    opacity: 0;
`

const NavContent = styled.div`
    display:flex;
    flex-direction: column-reverse;

    align-items: center;
    padding-top: 20px;
    & ${NavLink}:hover + ${NavDot} {
        opacity: 1;
        transition: 0.35s;
    }
    & ${NavLink}.active + ${NavDot} {
        opacity: 1;
        
    }

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
            <NavLogoAndLink>
                <NavLogo>
                    <Link to='/'>
                        <img src='/284993175_5201268449966638_749157627880997743_n.png' />
                    </Link>
                </NavLogo>
                <NavWrapper>
                    <NavContent>

                        <NavLink to={'/graphic-design'}>Graphic design</NavLink>
                        <NavDot>
                            <BsCircleFill style={{ color: "#C392FF" }} />
                        </NavDot>
                    </NavContent>
                    <NavContent>
                        <NavLink to={'/interior-design'}>Interior design</NavLink>
                        <NavDot>
                            <BsCircleFill style={{ color: "#44D19D" }} />
                        </NavDot>
                    </NavContent>
                    <NavContent>
                        <NavLink to={'/about'}>About</NavLink>
                        <NavDot>
                            <BsCircleFill style={{ color: "#FCDD37" }} />
                        </NavDot>
                    </NavContent>
                    {props.admin && <NavLink to={'/edit'}>Edit content</NavLink>}
                    {props.admin && <NavLink to={'/editprofile'}>Edit profile</NavLink>}
                </NavWrapper>
                {!props.username && <NavAuth to={'/login'}>Login</NavAuth>}
                {props.username && <NavAuth to={'/'} onClick={Logout}>Logout</NavAuth>}

            </NavLogoAndLink>

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