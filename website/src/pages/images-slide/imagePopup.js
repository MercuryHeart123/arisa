import React, { useEffect, useState } from 'react'
import './imgPopup.css'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle, IoIosClose } from 'react-icons/io'


function ImagePopup(props) {

    console.log(props.index);

    const [current, setCurrent] = useState();

    useEffect(() => {
        setCurrent(props.index)
        
    }, [props.index])

    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 27: //esc to exit
                props.imgPopup(false);
                break;
            case 37: //leftArrow
                prevImg();
                break;
            case 39: //rightArrow
                nextImg();
                break;
        }
    };

    const img = props.data
    const length = props.data.length;

    const prevImg = () => {
        current === 1 ? setCurrent(length - 1) : setCurrent(current - 1);
    }

    const nextImg = () => {
        current === length - 1 ? setCurrent(1) : setCurrent(current + 1);
    }


    return (props.trigger ?
        <div className='popup' >
            <IoIosClose className='closeButton' onClick={() => {
                props.imgPopup(false)
            }} />
            <IoMdArrowDroprightCircle className="rightArrow" onClick={nextImg} />
            <IoMdArrowDropleftCircle className="leftArrow" onClick={prevImg} />
            {img.map((img, index) => {
                if (index === 0) { return }
                return (
                    <section className={index === current ? "slide active" : "slide"} key={index}>
                        {index === current && (
                            <div>
                                <img src={`${props.url + img}`} alt={index} className="image" />
                            </div>
                        )}
                    </section>
                )
            })}
        </div>
        : " ")
}

export default ImagePopup