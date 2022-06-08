import React , {useEffect, useState} from 'react'
import './imgPopup.css'
import {IoMdArrowDropleftCircle,IoMdArrowDroprightCircle,IoIosClose} from 'react-icons/io'

function ImagePopup(props) {

    const [current,setCurrent] = useState(props.index);

    const img = props.data
    const length = props.data.length;

    const prevImg = ()=>{
        current === 1 ? setCurrent(length-1) : setCurrent(current-1);
    }

    const nextImg = ()=>{
        current === length-1 ? setCurrent(1) : setCurrent(current+1);
    }


  return (props.trigger ? 
    <div className='popup' >
        <IoIosClose className='closeButton' onClick={()=>{
            props.imgPopup(false)
            setCurrent(1)
        }}/>
        <IoMdArrowDroprightCircle className="rightArrow" onClick={nextImg}/>
        <IoMdArrowDropleftCircle className="leftArrow" onClick={prevImg}/>
        {img.map((img,index)=>{
            let num = index
            if(index < 10){ num = "0"+index }
            if(index === 0){ return }
            return(
                <section className={index === current ? "slide active" : "slide"} key={index}>
                {index === current && (
                    <div>
                        <img src={`${props.url+img}`} alt={num} className="image"/>
                        <p className='numpics'>{num}</p>
                    </div>
                )}
                </section>
            )
        })}
    </div>
    : " ")
}

export default ImagePopup