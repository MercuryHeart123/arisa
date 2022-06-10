import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsLine, BsTelephone } from 'react-icons/bs'
import './style.css'

const About = () => {
    return (
        <div className="containerProfile">
            <div className="profile">
                <img src='https://via.placeholder.com/250x250' />
                <h1>
                    Title
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita eveniet. Nemo ipsam quo placeat ab ea repellat architecto veritatis ad dolore alias, earum optio error quas corrupti voluptate rerum!
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