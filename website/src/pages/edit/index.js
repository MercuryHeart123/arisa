import React, { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'
import EachPost from './eachPost'

const Edit = () => {
    const [category, setCategory] = useState("graphic-design")
    const [data, setData] = useState()
    const [selectedProject, setSelectedProject] = useState()
    const [eachPost, setEachPost] = useState()
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;

    useEffect(() => {
        if (!data) {
            updateData()
        }
    }, [])


    useEffect(() => {
        updateData()
    }, [category])

    const updateData = () => {
        const url = `${ip}:${port}/image/list/${category}`;
        setData(null)
        axios.get(url).then((res) => {
            let fetchData = res.data
            console.log(fetchData);
            setData(fetchData)
        })
    }

    const renderEachPost = () => {
        setEachPost(category)
    }

    if (eachPost) {
        return <EachPost
            data={selectedProject}
            category={category}
            updateData={updateData}
            setEachPost={setEachPost}
            setSelectedProject={setSelectedProject}
        />
    }

    return (
        <div className="container">
            <div className="category">
                <div
                    style={{
                        backgroundColor: `${category == "graphic-design" ? '#e5e5e5' : '#fff'}`
                    }}
                    onClick={() => { setCategory("graphic-design") }}>
                    Graphic Design
                </div>
                <div
                    style={{
                        backgroundColor: `${category == "interior-design" ? '#e5e5e5' : '#fff'}`
                    }}
                    onClick={() => { setCategory("interior-design") }}>
                    Interior Design
                </div>
            </div>
            <button onClick={() => renderEachPost()}>
                Add new project
            </button>
            <div className="project-gallery">
                {data && data.map((item, index) => {
                    const url = `${ip}:${port}/image/view/`;
                    return <div onClick={() => {
                        setSelectedProject(item)
                        renderEachPost()
                    }}>
                        {item.featureImage ?
                            <img src={`${url + item.featureImage}`} key={index} />
                            : <img src={`https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg`} key={index} />
                        }

                    </div>
                })}

            </div>
        </div>
    )
}

export default Edit