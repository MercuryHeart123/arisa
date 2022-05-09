import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const text = 'Established 2012'
const CircularImg = ({ img, index }) => {
    const [imgWidth, setImgWidth] = useState()
    const [imgHeight, setImgHeight] = useState()

    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        setImgHeight(offsetHeight)
        setImgWidth(offsetWidth)

    };

    const angleToRad = (angle) => {
        return angle * (Math.PI / 180)
    }
    const findMin = (a, b) => {
        return a > b ? b : a
    }
    const createCircular = (text) => {
        let splitText = text.split('')
        const radius = 25 + findMin(imgHeight, imgWidth) / 2

        let angle = -90
        const deltaAngle = 90 / splitText.length

        return splitText.map((element, index) => {
            const xPos = radius * Math.cos(angleToRad(angle)) + (imgWidth / 2);
            const yPos = radius * Math.sin(angleToRad(angle)) + (imgHeight / 2);
            const rotate = `rotate(${index * deltaAngle}deg)`
            const transform = `translate(${xPos}px, ${yPos}px) ${rotate}`

            angle += deltaAngle
            return <span style={{
                transform: transform,

            }}>
                {element}
            </span>
        });

    }
    return (
        <div className='textWrapper'>

            <Link style={{ textDecoration: 'none' }} to={`/123`}>
                <img onLoad={onImgLoad} id='Images' key={`${index}`} src={img.src} />

                {imgHeight && <div id='textCircular'>
                    {createCircular(text)}
                </div>}



            </Link>
        </div>
    )
}

export default CircularImg