import React, { useState } from 'react'
import * as Io from 'react-icons/io'
import './chooseImg.css'
const EachImg = ({ item, filenames, setFilenames }) => {
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const url = `${ip}:${port}/image/view/`;
    const [toggle, setToggle] = useState(filenames.includes(item.filename));
    return (
        <span className='imgWrap' onClick={() => {
            setToggle(!toggle)
            if (!filenames.includes(item.filename)) {
                setFilenames([...filenames, item.filename])
            }
            else {
                var index = filenames.indexOf(item.filename);
                if (index !== -1) {
                    filenames.splice(index, 1);
                }
                setFilenames([...filenames])
            }
        }}>
            <img
                className='ChooseEachImg'
                src={`${url + item.filename}`}
                style={toggle ? { border: 'solid 5px #0d6efcff', borderRadius: '5px' } : {}}
            />
            <Io.IoIosAddCircleOutline className='add' />
        </span>
    )
}

export default EachImg