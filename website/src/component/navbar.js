import React, { useState } from 'react'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from "react-redux";
import axios from 'axios'
import { BsCircleFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import './navbar.css'
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
    justify-content: space-between;
    @media screen and (max-width: 960px) {
    display: none;
  }
    
`
const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    margin: ${props => props.mobile ? "10px 0" : "0 40px"};
    padding: 0 10px;
    /* &.active{
        color: gray;
    } */
`

const NavLine = styled.div`
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: 1px solid black;
    width: 90%;
    margin: 0 auto 20px auto;
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
const Bars = styled(FaBars)`
  display: none;
  color: black;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const Navbar = (props) => {
    const [sidebar, setSidebar] = useState(false);

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
                        <img src='/logo.png' />
                    </Link>
                </NavLogo>
                <Bars onClick={() => { setSidebar(!sidebar) }} />
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className='nav-menu-items' >
                        <div className='navbar-toggle' onClick={() => setSidebar(!sidebar)}>
                            <AiOutlineClose style={{ color: 'black' }} />
                        </div>
                        <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/graphic-design'}>Graphic design</NavLink>
                        <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/interior-design'}>Interior design</NavLink>
                        <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/about'}>About</NavLink>
                        {props.admin &&
                            <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/edit'}>Edit content</NavLink>
                        }
                        {props.admin &&
                            <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/editprofile'}>Edit profile</NavLink>
                        }
                        {!props.username &&
                            <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/login'}>Login</NavLink>
                        }
                        {props.username &&
                            <NavLink onClick={() => setSidebar(!sidebar)} mobile={true} to={'/logout'}>Logout</NavLink>
                        }
                    </div>
                </nav>
                <NavWrapper>
                    <div style={{ display: 'flex' }}>
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
                        {props.admin &&
                            <NavContent>
                                <NavLink to={'/edit'}>Edit content</NavLink>
                                <NavDot>
                                    <BsCircleFill style={{ color: "#297373" }} />
                                </NavDot>
                            </NavContent>}
                        {props.admin &&
                            <NavContent>
                                <NavLink to={'/editprofile'}>Edit profile</NavLink>
                                <NavDot>
                                    <BsCircleFill style={{ color: 'red' }} />
                                </NavDot>
                            </NavContent>}
                    </div>
                    <div>
                        {!props.username &&
                            <NavContent>
                                <NavLink to={'/login'}>Login</NavLink>
                                <NavDot>
                                    <BsCircleFill style={{ color: "#297373" }} />
                                </NavDot>
                            </NavContent>}
                        {props.username &&
                            <NavContent>
                                <NavLink to={'/'} onClick={Logout}>Logout</NavLink>
                                <NavDot>
                                    <BsCircleFill style={{ color: "#297373" }} />
                                </NavDot>
                            </NavContent>
                        }
                    </div>
                </NavWrapper>
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