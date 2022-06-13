import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsLine, BsTelephone } from 'react-icons/bs'
import './style.css'
import ReactLoading from 'react-loading'


let ip = process.env.REACT_APP_IP || "localhost";
let port = process.env.REACT_APP_PORT || 8080;

const About = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true)
        let url = `${ip}:${port}/api/getprofile`
        setLoading(true)
        axios.get(url)
            .then((res) => {
                setData(res.data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    return (
        <div>
            {loading ?
                (<div style={{ display: "flex", justifyContent: "center" }}>
                    <ReactLoading type={"bars"} color={"black"} height={"20%"} width={"20%"} />
                </div>) :
                (<div className="containerProfile">
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
                            <div className="logoIcon">
                                <AiOutlineInstagram />
                            </div>
                            <a href='https://www.instagram.com/__a.ris.a__/' target="_blank">
                                a.ris.a
                            </a>
                        </div>
                        <div className="logoInfo">
                            <div className="logoIcon">
                                <BsLine />
                            </div>
                            <a href='https://lin.ee/2xJvZWsg4​' target="_blank">
                                @136zizzv
                            </a>
                        </div>
                        <div className="logoInfo">
                            <div className="logoIcon">
                                <BsTelephone />
                            </div>
                            <span>
                                088-6228534
                            </span>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default About