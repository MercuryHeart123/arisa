import React from 'react'
import './profilePopup.css'
import { IoIosClose } from 'react-icons/io'

function ProfilePopup(props) {
    
    document.onkeydown = (e) => {
        switch (e.keyCode){
            case 27:
                props.setPopup(false);
                break;
        }
    }

  return (props.trigger ? 
    <div className='popup'>
        <IoIosClose className='closeButton' onClick={() => {
            props.setPopup(false)
        }} />
        <img src={props.img} alt="profileImg" className='img'/>
    </div>:" "
  )
}

export default ProfilePopup