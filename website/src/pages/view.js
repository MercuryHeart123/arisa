import React from 'react'

const View = (props) => {
    let data = props.data
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    let url = `${ip}:${port}/image/view/`
    return (props.data ? (
        <div>
            <h1>
                {data.name}
            </h1>
            <p>
                {data.description}
            </p>
            <img style={{ width: '300px' }} src={`${url + data.filenames[0]}`} />

        </div>)
        : "Error"
    )
}

export default View