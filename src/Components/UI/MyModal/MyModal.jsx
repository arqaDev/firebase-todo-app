import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './MyModal.css'


const MyModal = ({children, visible, setVisible}) => {

    /**
     * 
     * При нажатии на темную часть модального окно оно закрывается
     */
    const closeModal = () => {
        setVisible(false)
    }

    return (
        <div className={visible ? "modal__container active" : "modal__container"} onClick={closeModal}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
            <AiOutlineClose className="modal__hide" onClick={() => setVisible(false)}/>
        </div>
    )
}

export default MyModal