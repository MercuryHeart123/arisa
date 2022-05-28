import React , {useState,useEffect} from 'react'
import styled from 'styled-components';
import { Link , Navigate } from 'react-router-dom';
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
    const [succes,setSucess] = useState(false);
    const [pstatus,setPstatus] = useState(true)
    const [user,setUser] = useState(true);
    const [mail,setMail] = useState(true);
    const [pass,setPass] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        
    })

    const handleSubmit = (e)=>{
        // console.log(e);
        e.preventDefault();
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let cPassword = e.target.cpassword.value;
        const url = `${ip}:${port}/register`;

        setPstatus(true);
        axios.post(url,{
            username,
            password,
            cPassword,
            email
        })
        .then((res=>{
            console.log(res.data.msg);
            setSucess(true);
        }))
        .catch((err)=>{
            setPstatus(false);
            console.log(err.response.data.msg);
            if(err.response.data.msg === "Username already exist"){
                setUser(false);
            }
            else if(err.response.data.msg === "Email already exist"){
                setMail(false);
            }
            else if(err.response.data.msg === "Password and Confirm password doesn't match"){
                setPass(false);
            }
            setError(err.response.data.msg);
        });
            
        
}

  return (
    <Container>
            {succes && <Navigate to="/login"/>}
            <form onSubmit={handleSubmit}>
                <h3 style={{ textAlign: "center", padding: '1rem 0' }}>Register</h3>

                <div className="form-group" style={{ marginTop: "2vh" }}>
                    {user ?  <Label>Username</Label> : <Label style={{color:"red"}}>Username 
                        <img src={require('../img/warning.png')} width="15px" height="15x" alt="warnning" style={{textAlign:"center",marginLeft:"5px"}}/> 
                        </Label>}
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
                {mail ?  <Label>Email</Label> : 
                        <Label style={{color:"red"}}>Email 
                        <img src={require('../img/warning.png')} width="15px" height="15x" alt="warnning" style={{textAlign:"center" ,marginLeft:"5px"}}/> 
                        </Label>}
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
                {pass?  <Label>Password</Label> : <Label style={{color:"red"}}>Password
                        <img src={require('../img/warning.png')} width="15px" height="15x" alt="warnning" style={{textAlign:"center",marginLeft:"5px"}}/> 
                        </Label>}
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
                {pass ?  <Label>Confirm Password</Label> : <Label style={{color:"red"}}>Confirm Password 
                        <img src={require('../img/warning.png')} width="15px" height="15x" alt="warnning" style={{textAlign:"center",marginLeft:"5px"}}/> 
                        </Label>}
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
                        {error}
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