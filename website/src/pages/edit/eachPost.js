import React, { useState } from 'react'
import axios from "axios";
import Popup from './popup';
import './style.css'
import ChooseImg from './chooseImg';
import { MdOutlineCancel } from 'react-icons/md'

const EachPost = (props) => {
    const [filenames, setFilenames] = useState(props.data ? props.data.filenames : [])
    const [popupImgStore, setPopupImgStore] = useState(false)
    const [popupChooseImg, setPopupChooseImg] = useState(false)
    const [updateChooseImg, setUpdateChooseImg] = useState()

    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.projectName.value;
        let description = event.target.description.value;

        const url = `${ip}:${port}/api/post`;
        let formData = {
            _id: props.data ? props.data._id : null,
            name,
            description,
            filenames,
            category: props.category
        }
        axios.defaults.withCredentials = true;
        axios
            .post(url, formData)
            .then((res) => {
                console.log(res);
                props.updateData()
                props.setSelectedProject(null)
                props.setEachPost(null)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteSelectedFilename = (filename) => {
        var index = filenames.indexOf(filename);
        if (index !== -1) {
            filenames.splice(index, 1);
        }
        setFilenames([...filenames])
    }

    const deletePost = () => {
        let _id = props.data._id
        const url = `${ip}:${port}/api/delete`;
        let formData = { _id }
        axios.defaults.withCredentials = true;
        axios
            .post(url, formData)
            .then((res) => {
                console.log(res);
                props.updateData()
                props.setSelectedProject(null)
                props.setEachPost(null)
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const createEachImg = () => {
        const url = `${ip}:${port}/image/view/`;
        return filenames.map((item, index) => {

            return (
                <span className='chooseImgWrap' onClick={() => {
                    deleteSelectedFilename(filenames[index])
                }}>
                    <img className='chooseEachImg' src={`${url + filenames[index]}`} />
                    <MdOutlineCancel className='delete' />
                </span>
            )


        })
    }

    return (
        <div style={{ paddingTop: '2vh', textAlign: 'center' }}>
            <Popup
                trigger={popupImgStore}
                setPopupImgStore={setPopupImgStore}

            />
            <ChooseImg
                trigger={popupChooseImg}
                setPopupChooseImg={setPopupChooseImg}
                setFilenames={setFilenames}
                setUpdateChooseImg={setUpdateChooseImg}
                filenames={filenames}
            />
            <button class="imgStore" onClick={() => { setPopupImgStore(true) }}>
                Open image store
            </button>
            <div style={{ flexBasis: "100%", height: "2vh" }}></div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>

                <div style={{ width: '640px', textAlign: 'center' }}>
                    <button class="chooseImg" onClick={() => {
                        updateChooseImg()
                        setPopupChooseImg(true)
                    }}>
                        Choose Image
                    </button>
                    <div style={{ overflowY: 'scroll', height: '50vh' }}>
                        {filenames && createEachImg()}

                    </div>
                </div>

                <div class="mb-3" style={{ width: '640px', textAlign: 'left' }}>
                    <form id="all-data" onSubmit={handleSubmit} enctype="multipart/form-data">

                        <div class="mb-3">
                            <label class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control" value={props.category} />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                ชื่อ Project
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                name="projectName"
                                defaultValue={props.data ? props.data.name : ''}
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
                                defaultValue={props.data ? props.data.description : ''}
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
            <div style={{ flexBasis: "100%", height: "2vh" }}></div>
            <div
                style={{ width: "1vw", height: "auto", display: "inline-block" }}
            />
            <div className='button-section'>
                <button className='back-btn' onClick={() => {
                    props.updateData()
                    props.setSelectedProject(null)
                    props.setEachPost(null)
                }}>
                    Back
                </button>
                {props.data && <button className='btn btn-danger' onClick={() => {
                    deletePost()
                }}>
                    Delete post
                </button>}
                <button form="all-data" type="submit" className='btn btn-primary'>
                    {props.data ? "Update post" : "Create post"}
                </button>
            </div>
        </div>
    )
}

export default EachPost