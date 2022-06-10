import React from 'react'
import {Link} from 'react-router-dom'
import loadingData from "./loading.json";
import { useLottie } from "lottie-react"

const NotFound = () => {

    const options = {
        animationData: loadingData,
        loop: true,
        autoplay: true
      };
    
    const { View } = useLottie(options);
    return (
        <div style={{margin:"auto",position:"relative"}}>
            <div style={{textAlign:"center",margin:"auto",width:"1000px",height:"500px"}}>
                {View}
                
            </div>   
        </div>   
    )
}

export default NotFound