import React, { useEffect, useState } from 'react'
import './chooseImg.css'
import axios from 'axios'
import EachImg from './eachImg'

const ChooseImg = (props) => {
    const [allImg, setAllImg] = useState()
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;

    useEffect(() => {
        updateData()
        if (!props.isProfile) {
            props.setUpdateChooseImg(() => () => updateData())
        }
    }, [])

    const updateData = () => {
        const url = `${ip}:${port}/image/list/all`;
        axios.get(url).then((res) => {
            let data = res.data
            setAllImg(data)
        })
    }



    const createEachImg = () => {
        return allImg.map((item, index) => {
            return <EachImg
                item={item}
                setFilenames={props.setFilenames}
                filenames={props.filenames}
                isProfile={props.isProfile}
            />
        })
    }

    return (props.trigger ?
        (<div className='popup' >
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => (props.setPopupChooseImg(false))}>
                    close
                </button>
                <span>
                    <h1>Choose Img</h1>
                    <div style={{ display: 'inline-block', textAlign: 'center' }}>
                        <span>
                            {allImg && createEachImg()}
                        </span>

                    </div>
                </span>

            </div>
        </div>)
        : ""
    )
}

export default ChooseImg