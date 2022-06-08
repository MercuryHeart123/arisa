import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


const NotFound = () => {

    return (
        <div style={{width:"80%",height:"80vh",margin:"auto",position:"relative"}}>
            <div style={{textAlign:"center",position:"absolute",left:"45%",top:"35%"}}>
                <h1 style={{fontSize:"50px"}}>Not Found</h1>
                <Link to="/">Go Back</Link> 
            </div>   
        </div>   
    )
}

export default NotFound