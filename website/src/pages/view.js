import React ,{useState,useEffect} from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import ImagePopup from './images-slide/imagePopup';

const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-gap: 10px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`
const Image = styled.img`
    width: 300px;
    cursor: pointer;
    
`

const View = (props) => {
    const [loading,setLoading] = useState(true);
    const [imgPopup,setImgPopup] = useState(false);

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
            data={img}
            url={url}
            />
            <h1 style={{textAlign:"center",marginBottom:"4vh",marginTop:"4vh"}}>
                {data.name}
            </h1>
            <Gallery>
                {img.map((image,index)=>{
                    let num = index
                    if(index < 10){ num = "0"+index }
                    if(index == 0){ return }
                    return(
                    <div style={{padding:"50px",position:"relative"}} key={index} >
                        <Image src={`${url + image}`} onClick={()=>{
                            setImgPopup(true) 
                        }}/>
                        <p style={{marginLeft:"5px",width:"300px",marginTop:"5px",position:"absolute"}}>{num}</p>
                    </div>
                    )
                })}
            </Gallery>  
            <p style={{textAlign:"center",marginTop:"4vh"}}>
                {data.description}
            </p>
        </div>)
        : "Error"
    )
}

export default View