
import React, { useState, useEffect } from 'react';
import StackGrid from "react-stack-grid";
import CircularImg from '../circularImg';
import axios from "axios";

let ip = process.env.REACT_APP_IP || "localhost";
let port = process.env.REACT_APP_PORT || 8080;
const Interior = () => {
    const [images, setImages] = useState();

    useEffect(() => {
        const url = `${ip}:${port}/image/list/interior-design`;
        axios.get(url).then((res) => {
            let data = res.data
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
<<<<<<< HEAD
                        <div style={{ margin: '0 30px' }}>
=======
                        <div style={{ margin: '30px 30px' }}>
>>>>>>> 422cc2b054c1981fa54aa513d76b518ddfc91f6c
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

export default Interior