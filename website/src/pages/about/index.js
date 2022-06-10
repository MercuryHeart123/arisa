import React , {useEffect, useState}from 'react'
import axios from 'axios'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsLine, BsTelephone } from 'react-icons/bs'
import './style.css'


let ip = process.env.REACT_APP_IP || "localhost";
let port = process.env.REACT_APP_PORT || 8080;

const About = () => {

    const [data,setData] = useState([])

    useEffect(()=>{
        let url = `${ip}:${port}/api/getprofile`
        console.log(url);
        axios.get(url)
        .then((res)=>{
            console.log(res);
            setData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <div className="containerProfile">
            <div className="profile">
                <img src={`${ip}:${port}/image/view/${data.filenames}`} />
                <h1>
                   {data.title}
                </h1>
                <p>
                    {data.caption}
                </p>
            </div>

            <div className="contact">
                <div className="logoInfo">
                    <AiOutlineInstagram />
                    <a href='https://www.instagram.com/nnunoo.n/' target="_blank">
                        nnunoo.n
                    </a>
                </div>
                <div className="logoInfo">
                    <BsLine />
                    <a href='https://lin.ee/2xJvZWsg4​' target="_blank">
                        nnunoo.n
                    </a>
                </div>
                <div className="logoInfo">
                    <BsTelephone />
                    <span>
                        089-123-1234
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About