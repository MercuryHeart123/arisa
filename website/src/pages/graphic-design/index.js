import React, { useState, useEffect } from 'react';
import StackGrid from "react-stack-grid";
import CircularImg from '../circularImg';
import axios from "axios";

let ip = process.env.REACT_APP_IP || "localhost";
let port = process.env.REACT_APP_PORT || 8080;
const Graphic = () => {
    const [images, setImages] = useState();

    useEffect(() => {
        const url = `${ip}:${port}/image/list/graphic-design`;
        axios.get(url).then((res) => {
            let data = res.data
            // console.log(data);
            setImages(data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }, [])

    return (
        <div style={{ padding: '30px 0' }}>
            <StackGrid columnWidth={400} duration={450} monitorImagesLoaded={true} >
                {images && images.map((img, index) => {
                    return (
                        <div style={{ margin: '30px 30px' }}>
                            <CircularImg
                                img={img}
                                index={index}
                            />
                        </div>
                    )
                })}
            </StackGrid>

        </div>
    )

}

export default Graphic