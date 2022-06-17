import React, { useState } from 'react'
import styled from 'styled-components'
import ImagePopup from './images-slide/imagePopup';
import ReactLoading from 'react-loading'

const Gallery = styled.div`

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 80%;
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        max-width: 80%;
    }

`
const Image = styled.img`

    width: 100%;
    cursor: pointer;
    transition: 1s ease;

    &:hover{
        transform: scale(1.08);
        transition-duration: 0.2s;
    }

`
const Frame = styled.div`
    
    display: ${props => props.loading ? "none" : "block"};
    padding: 50px;
    position: relative;
    text-align: center;

`
const Wrapper = styled.div`

    transition: 1s ease;

    &:hover{
        transform: scale(1.08);
        transition-duration: 0.2s;
    }

`


const View = (props) => {

    console.log(props);
    const [imgPopup, setImgPopup] = useState(false);
    const [imgIndex, setImgIndex] = useState();
    const [loading, setLoading] = useState(true);

    let data = props.data
    let img = data.filenames;
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    let url = `${ip}:${port}/image/view/`
    
    return (props.data ? (
        <div>
            <ImagePopup
                trigger={imgPopup}
                imgPopup={setImgPopup}
                index={imgIndex}
                data={img}
                url={url}
            />
            <h1 style={{ textAlign: "center", marginBottom: "4vh", marginTop: "4vh" }}>
                {data.name}
            </h1>
            
            <Gallery onLoad={()=>{setTimeout(() => {setLoading(false)
                
            }, 100) }}>
                {img.map((image, index) => {
                    if (index === 0) { return }
                    return (
                        <>
                            {loading ? 
                            (<div style={{ display: "flex", justifyContent: "center" }}>
                                <ReactLoading type={"bars"} color={"black"} height={"20%"} width={"20%"} />
                            </div>) : ""}
                            
                            <Frame key={index} loading={loading}>
                                <Wrapper>
                                    <Image src={`${url + image}`} onClick={() => {
                                        setImgIndex(index)
                                        setImgPopup(true)
                                    }}/>
                                </Wrapper>
                            </Frame>
                        </>
                    )
                })}
            </Gallery>
            <p style={{ textAlign: "center", marginTop: "4vh" }}>
                {data.description}
            </p>
        </div>)
        : "Error"
    )
}

export default View