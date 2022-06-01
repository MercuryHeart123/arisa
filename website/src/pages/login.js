import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { AiFillEyeInvisible , AiOutlineEye } from 'react-icons/ai';
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
    let [redirect, setRedirect] = useState(false)
    let [loginFail, setLoginFail] = useState(false)
    const [showPassword,setShowPassword] = useState(false);

    const passwordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        let username = event.target.username.value;
        let password = event.target.password.value;
        let ip = process.env.REACT_APP_IP || "localhost";
        let port = process.env.REACT_APP_PORT || 8080;
        const url = `${ip}:${port}/login`;
        const formData = {
            username,
            password,
        };
        axios.defaults.withCredentials = true;
        axios
            .post(url, formData)
            .then((res) => {
                let username = res.data.username;
                let admin = res.data.admin;
                props.dispatch({
                    type: "login",
                    data: { username, admin },
                });
                setRedirect(true)
            })
            .catch((err) => {
                setLoginFail(true)
            });
    }

    if (redirect || props.username) {
        return <Navigate to='/' />;
    }

    return (
        <div
            style={{
                paddingBottom: "20vh",
                width: "30vw",
                margin: "0 auto",
                textAlign: "left",
            }}
        >
            <form onSubmit={handleSubmit}>
                <h3 style={{ textAlign: "center", padding: '1rem 0' }}>Login</h3>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="username"
                        placeholder="Enter Username"
                        style={{ marginTop: "2vh",width:"95%" }}
                    />
                </div>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <label>Password</label>
                    {/* <input
                        type="password"
                        className="form-control"
                        required={true}
                        name="password"
                        placeholder="Enter password"
                        style={{ marginTop: "2vh" }}
                    /> */}
                     <div style={{display:"flex"}}>
                        <input
                            type={!showPassword ? "password" : "text"}
                            className="form-control"
                            required={true}
                            name="password"
                            placeholder="Password"
                            style={{ marginTop: "2vh"}}
                        />
                     <div style={{marginLeft:"0.5vw"}}>
                        {!showPassword ? <AiOutlineEye style={{fontSize:"25px" ,marginTop:"2.5vh" ,cursor:"pointer"}}
                            onClick={passwordVisibility}
                        /> : 
                        <AiFillEyeInvisible style={{fontSize:"25px" ,marginTop:"2.5vh" ,cursor:"pointer"}}
                            onClick={passwordVisibility}
                        />}
                    </div>
                </div>
                </div>
                <div>
                    Don't have account?, <span><Link to={"/register"}>
                        Register
                    </Link>

                    </span>
                </div>
                {loginFail && <div style={{ color: 'red', paddingTop: '0.5rem' }}>
                    Username and Password doesn't match.
                </div>}
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ marginTop: "2vh" }}
                >
                    Submit
                </button>

            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        admin: state.user.admin,
    };
};
export default connect(mapStateToProps)(Login);

