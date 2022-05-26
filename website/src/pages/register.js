import React , {useState} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ip = `${process.env.REACT_APP_IP}` || "localhost";
const port = `${process.env.REACT_APP_PORT}` || 8080;
const Label = styled.label`
    font-weight: 600;
`
const Container = styled.div`
    padding-buttom: 20vh;
    width: 30vw;
    margin: 0 auto;
    text-align: left;
`
function Register() {
    const [pstatus,setPstatus] = useState(true)

    const handleSubmit = (e)=>{
        // console.log(e);
        e.preventDefault();
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let cPassword = e.target.cpassword.value;
        const url = `${ip}:${port}/register`;
        if(password != cPassword){
            setPstatus(false);
        }
        else{
            setPstatus(true);
            axios.post(url,{
                username,
                password,
                cPassword,
                email
            })
            .then((res=>{
                console.log(res);
            }))
            .catch((err)=>{
                console.log(err);
            });
            
        }
    }

  return (
    <Container>
            <form onSubmit={handleSubmit}>
                <h3 style={{ textAlign: "center", padding: '1rem 0' }}>Register</h3>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <Label>Username</Label>
                    <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="username"
                        placeholder="Enter Username"
                        style={{ marginTop: "2vh" }}
                    />
                </div>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <Label>Email</Label>
                    <input
                        type="email"
                        className="form-control"
                        required={true}
                        name="email"
                        placeholder="Enter Email"
                        style={{ marginTop: "2vh" }}
                    />
                </div>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <Label>Password</Label>
                    <input
                        type="password"
                        className="form-control"
                        required={true}
                        name="password"
                        placeholder="Enter Password"
                        style={{ marginTop: "2vh" }}
                    />
                </div>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    <Label>Confirm Password</Label>
                    <input
                        type="password"
                        className="form-control"
                        required={true}
                        name="cpassword"
                        placeholder="Confirm Password"
                        style={{ marginTop: "2vh" , marginBottom:"2vh"}}
                    />
                </div>

                <div>
                    Already have account?, <span><Link to={"/login"}>
                        Login
                    </Link>

                    </span>
                </div>
                {!pstatus && <div style={{ color: 'red', paddingTop: '0.5rem', textAlign:"center" }}>
                        Password and Confirm Password unmatched
                    </div>}
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ marginTop: "2vh" ,width:"100%"}}
                >
                    Sign Up
                </button>

            </form>
        </Container>
  )
}

export default Register