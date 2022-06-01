import React, { useEffect, useRef, useState } from 'react'
import './popup.css'
import * as Ai from 'react-icons/ai'
import axios from "axios";

let ip = process.env.REACT_APP_IP || "localhost";
let port = process.env.REACT_APP_PORT || 8080;
const Popup = (props) => {
    const ref = useRef()
    const [img, setImg] = useState()
    const [allImg, setAllImg] = useState()

    const btnAddImgClick = () => {
        ref.current.click();

    }

    const updateData = () => {
        const url = `${ip}:${port}/image/list`;
        axios.get(url).then((res) => {
            let data = res.data
            setAllImg(data)
        })
    }

    useEffect(() => {
        updateData()
    }, [])

    useEffect(() => {
        console.log(img);
        const url = `${ip}:${port}/image/upload`;
        let formData = new FormData()
        formData.append('file', img)
        axios.defaults.withCredentials = true;
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                updateData()
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [img])

    const handleFileChange = (change) => {
        setImg(change)
    }

    const deleteImgByName = (filename) => {
        const url = `${ip}:${port}/image/delete`;

        let pathName = url + "/" + filename
        axios
            .delete(pathName)
            .then((res) => {
                console.log(res);
                updateData();
            })
            .catch((err) => { console.log(err); })
    }

    const createEachImg = () => {
        const url = `${ip}:${port}/image/view/`;
        return allImg.map((item, index) => {

            return <span className='imgWrap' onClick={() => deleteImgByName(item.filename)}>
                <img className='EachImg' src={`${url + item.filename}`} />

                <Ai.AiOutlineDelete className='trash' />

            </span>
        })
    }

    return (props.trigger ?
        (<div className='popup' >
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => (props.setPopup(false))}>
                    close
                </button>
                <span>
                    <h1>Image store</h1>
                    <input
                        class="form-control"
                        type="file"
                        id="file"
                        name="file"
                        enctype="multipart/form-data"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />

                </span>
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <span>
                        {allImg && createEachImg()}
                    </span>

                </div>


            </div>
        </div>)
        : ""
    )
}

export default Popup