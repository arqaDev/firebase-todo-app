import React, { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import './Update.css'


const Update = ({title, overview, finishDate, img, isDone, update, setVisible}) => {
    const [updateTitle, setUpdateTitle] = useState(title)
    const [updateOverview, setUpdateOverview] = useState(overview)
    const [updateFinishDate, setUpdateFinishDate] = useState(finishDate)
    const [updateImg, setUpdateImg] = useState(img)
    const [updateIsDone, setUpdateIsDone] = useState(isDone)
    const [file, setFile] = useState([])

    /**
     * Предотвращает возникновение ошибки при отркрытии модального окна
     */
    useEffect(() => {
        if (!img) {
            setUpdateImg([])
        }
    }, [])

    useEffect(() => {
        if (file) {
            if (file.name === undefined) {
                return 
            }
        }
        const uploadFiles = async () => {
            const fileRef = ref(storage, `files/${Date.now().toString() + file.name}`)
            const uploadTusk = uploadBytesResumable(fileRef, file)
            uploadTusk.on('state_changed', () => {
                getDownloadURL(uploadTusk.snapshot.ref).then(url => {
                    if (updateImg) {
                        setUpdateImg([...updateImg, url])
                    } else {
                        setUpdateImg([url])
                    }
                })
            })
        }
        uploadFiles()
    }, [file])

    /**
     * записывает обновленные данные и закрывает окно
     */
    const updateTodo = () => {
        update(updateTitle, updateOverview, updateFinishDate, updateImg, updateIsDone)
        setVisible(false)
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="update__form">
            <input
                type="text"
                className="field update__title"
                placeholder="Название"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <input
                type="text"
                className="field update__overview"
                placeholder="Описание"
                value={updateOverview}
                onChange={(e) => setUpdateOverview(e.target.value)}
            />
            <input
                type="date"
                required pattern="\d{2}/\d{2}/\d{4}"
                className="update__date"
                value={updateFinishDate}
                onChange={(e) => setUpdateFinishDate(e.target.value)}
            />
            <input
                type="file"
                className="update__file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="update__images">
                {updateImg ? 
                    updateImg.map((url, index) => 
                        <img
                            key={index}
                            className="update__image"
                            src={url}
                            alt=""/>)
                    : []
                }
            </div>
            <div className="update__checkbox">
                <input
                    type="checkbox"
                    name="isDone"
                    checked={updateIsDone}
                    onChange={() => setUpdateIsDone(!updateIsDone)}
                />
                <label htmlFor="isDone" className="update__check">Выполнено</label>
            </div>
            <button
                className="update__btn"
                onClick={updateTodo}
                type="button"
            >
                Update
            </button>
        </form>
    )
}

export default Update