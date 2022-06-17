import React , { useState } from 'react'
import styled from 'styled-components';
import { AiFillEyeInvisible , AiOutlineEye } from 'react-icons/ai';
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
    const [succes,setSucess] = useState(false);  // Navigate to "/login"

    const [errorUserName,setErrorUserName] = useState('');
    const [errorEmail,setErrorEmail] = useState('');
    const [errorPassWord,setErrorPassWord] = useState('');
    const [errorRePassword,setErrorRePassWord] = useState('');
    
    const [userNameColor,setUserNameColor] = useState('');
    const [emailColor,setEmailColor] = useState('');
    const [passwordColor,setPasswordColor] = useState('');
    const [rePassWordColor,setRePassWordColor] = useState('');

    const [showPassword,setShowPassword] = useState(false);

    const passwordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e)=>{
        // console.log(e);
        e.preventDefault();
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let cPassword = e.target.cpassword.value;
        const url = `${ip}:${port}/register`;

        if(username.length < 5){
            setErrorUserName("Username must have at least 5 charactors");
            setUserNameColor("red");
        }
        else{
            setErrorUserName("");
            setUserNameColor("green");
        }

        if(password.length < 8){
            setErrorPassWord("Password must have at least 8 charactors");
            setPasswordColor("red");
            setRePassWordColor("red");
        }
        else if(password !== cPassword){
            setErrorPassWord("")
            setErrorRePassWord("Password and Confirm password doesn't match");
            setPasswordColor("red");
            setRePassWordColor("red");
            return
        }
        else{
            setPasswordColor("green");
            setRePassWordColor("green");
            setErrorRePassWord("");
        }
       
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
            console.log(err.response.data);
            if(err.response.data.msg === "Username already exist"){
                setErrorUserName("Username already exist");
                setUserNameColor('red');
            }

            if(err.response.data.msg === "Email already exist"){
                setErrorEmail("Email already exist");
                setEmailColor('red');         
            }
            else{
                setErrorEmail("");
                setEmailColor('green');
            }
        }); 
    }

  return (
    <Container>
        {succes && <Navigate to="/login"/>}
        <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center", padding: '1rem 0' }}>Register</h3>
            <div className="form-group" style={{ marginTop: "2vh" }}>
                <Label>Username</Label> 
                <input
                    type="text"
                    className="form-control"
                    required={true}
                    name="username"
                    placeholder="Username"
                    style={{ marginTop: "2vh",width:"95%",borderColor:userNameColor}}
                />
                <small style={{color:userNameColor}}>{errorUserName}</small>
            </div>

            <div className="form-group" style={{ marginTop: "2vh" }}>
                <Label>Email</Label>
                <input
                    type="email"
                    className="form-control"
                    required={true}
                    name="email"
                    placeholder="Email"
                    style={{ marginTop: "2vh",width:"95%",borderColor:emailColor}}
                />
                <small style={{ color:emailColor}}>{errorEmail}</small>
            </div>

            <div className="form-group" style={{ marginTop: "2vh"}}>
                <Label>Password</Label>
                <div style={{display:"flex"}}>
                    <input
                        type={!showPassword ? "password" : "text"}
                        className="form-control"
                        required={true}
                        name="password"
                        placeholder="Password"
                        style={{ marginTop: "2vh",borderColor:passwordColor}}
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
                <small style={{color:passwordColor}}>{errorPassWord}</small>
            </div>

            <div className="form-group" style={{ marginTop: "2vh" }}>
                <Label>Confirm Password</Label>
                <div style={{display:"flex"}}>
                    <input
                        type={!showPassword ? "password" : "text"}
                        className="form-control"
                        required={true}
                        name="cpassword"
                        placeholder="Confirm Password"
                        style={{ marginTop: "2vh",borderColor:passwordColor}}
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
                <small style={{ color:rePassWordColor,marginBottom:"2vh"}}>{errorRePassword}</small>
            </div>

            <div style={{marginTop:"2vh"}}>
                Already have an account?, <span><Link to={"/login"}>
                    Login
                </Link>
                </span>
            </div>
                
            <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ marginTop: "2vh" ,width:"95%"}}
            >
                Sign Up
            </button>
        </form>
    </Container>
  )
}


export default Register