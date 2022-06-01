import React, { useState } from 'react'
import axios from "axios";
import Popup from './popup';
import './style.css'
const Edit = () => {
    const [img, setImg] = useState("")
    const [popup, setPopup] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.projectName.value;
        let description = event.target.description.value;
        let ip = process.env.REACT_APP_IP || "localhost";
        let port = process.env.REACT_APP_PORT || 8080;
        const url = `${ip}:${port}/image/upload`;

        let formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('file', img)

        axios.defaults.withCredentials = true;
        axios.get(`${ip}:${port}/image/view`)
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleFileChange = (change) => {
        setImg(change)
    }

    const showPopUp = (bool) => {
        if (!popup) {
            setPopup(true)
            document.querySelector('html').classList.toggle('scroll-lock');
        }
        else {
            setPopup(false)
        }
    }
    return (
        <div style={{ paddingTop: '2vh', display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <button class="imgStore" onClick={() => { showPopUp(true) }}>
                Open image store
            </button>
            <Popup trigger={popup} setPopup={showPopUp} />

            <div style={{ flexBasis: "100%", height: "2vh" }}></div>
            <div class="mb-3" style={{ width: '30%', justifyContent: 'flex-start', margin: ' 0 20vh 0 0' }}>
                <label for="formFile" class="form-label">Default file input example</label>
                <input
                    class="form-control"
                    type="file"
                    id="file"
                    name="file"
                    enctype="multipart/form-data"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
            </div>

            <div class="mb-3" style={{ width: '30%', }}>
                <form id="all-data" onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div class="mb-3">
                        <label class="form-label">
                            ชื่อ Project
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            name="projectName"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">
                            Description
                        </label>
                        <textarea
                            class="form-control"
                            name="description"
                            rows="4"
                        ></textarea>
                    </div>

                </form>
            </div>

            <div style={{ flexBasis: "100%", height: "2vh" }}></div>
            <div
                style={{ width: "1vw", height: "auto", display: "inline-block" }}
            />
            <button form="all-data" type="submit" class="btn btn-primary">
                Create Post
            </button>


        </div>
    )
}

export default Edit