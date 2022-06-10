import React, { useEffect, useState } from 'react'
import ChooseImg from './chooseImg'
import './editprofile.css'
import axios from 'axios'

const EditProfile = (props) => {
    const [popupChooseImg, setPopupChooseImg] = useState(false)
    const [filenames, setFilenames] = useState()
    const [title, setTitle] = useState()
    const [caption, setCaption] = useState()
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const imgUrl = `${ip}:${port}/image/view/`;
    useEffect(() => {
        updateData()
    }, [])

    const updateData = () => {
        const url = `${ip}:${port}/image/list/profile`;
        axios
            .get(url)
            .then((res) => {
                let data = res.data
                setFilenames(data.filename)
                setTitle(data.title)
                setCaption(data.caption)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let caption = event.target.caption.value;
        console.log(title, caption, filenames);
        const url = `${ip}:${port}/api/postprofile`;
        let formData = {
            title,
            caption,
            filenames,
        }
        axios.defaults.withCredentials = true;
        axios
            .post(url, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="containerEditProfile">
            {filenames ? <img src={`${imgUrl + filenames}`} /> : <img src='https://via.placeholder.com/250x250' />}
            <div className="line"></div>
            <button class='changeImg' onClick={() => { setPopupChooseImg(true) }}>
                Change profile image
            </button>
            <ChooseImg
                trigger={popupChooseImg}
                setPopupChooseImg={setPopupChooseImg}
                setFilenames={setFilenames}
                filenames={filenames}
                isProfile={true}
            />
            <div class="mb-3" style={{ width: '640px', textAlign: 'center' }}>
                <form id="all-data" onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div class="mb-3" style={{ textAlign: 'left' }}>
                        <label class="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            name="title"
                            defaultValue={title ? title : ''}
                        />
                    </div>

                    <div class="mb-3" style={{ textAlign: 'left' }}>
                        <label for="exampleFormControlTextarea1" class="form-label">
                            caption
                        </label>
                        <textarea
                            class="form-control"
                            name="caption"
                            rows="4"
                            defaultValue={caption ? caption : ''}

                        ></textarea>
                    </div>
                    <button form="all-data" type="submit" className='btn btn-primary'>
                        Update
                    </button>
                </form>
            </div>

        </div>
    )
}

export default EditProfile