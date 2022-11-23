import React, { useState, useEffect } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { collection, doc, setDoc } from "firebase/firestore"
import { db, storage } from "../../../firebase"
import './MyForm.css'


const MyForm = ({create, setVisible}) => {
    const [todo, setTodo] = useState({title: "", overview: "", finishDate: "", isDone: false})
    const [file, setFile] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        if (file) {
            if (file.name === undefined) {
                return 
            }
        }
        
        /**
         * Загружает выбранные файлы в storage на сервер
         * и записывает в состояние
         */
        const uploadFiles = async () => {
            const fileRef = ref(storage, `files/${Date.now().toString() + file.name}`)
            const uploadTusk = uploadBytesResumable(fileRef, file)
            uploadTusk.on("state_changed", 
            () => {
                getDownloadURL(uploadTusk.snapshot.ref).then(url => {
                    setImages([...images, url])
                    setTodo({...todo, img: [...images, url]})
                })
            })
        }
        uploadFiles()

    }, [file])

    /**
     * Записывает новое todo в базу данных и отрисовывает
     * @param {*} e событие 
     */
    const addNewTodo = async (e) => {
        e.preventDefault()
        const newTodo = {
            ...todo
        }
        try {
            const docRef = doc(collection(db, "todos"))
            await setDoc(docRef, {...todo, id: docRef.id})
            create({...newTodo, id: docRef.id})
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setTodo({title: "", overview: "", finishDate: "", isDone: false})
        setImages([])
        setFile([])
        setVisible(false)
    }

    return (
        <form className="form">
            <input
                className="field form__title"
                placeholder="Название"
                type="text" value={todo.title}
                onChange={(e) => setTodo({...todo, title: e.target.value})}
            />
            <input
                className="field form__overview"
                placeholder="Описание"
                type="text" value={todo.overview}
                onChange={(e) => setTodo({...todo, overview: e.target.value})}
            />
            <input
                className="form__file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="form__images">
                {images.map((url, index) => <img className="form__image" src={url} key={index} alt=""/>)}
            </div>
            <button
                className="form__add"
                type="submit"
                onClick={addNewTodo}
            >
                Add Todo
            </button>
        </form>
    )
}

export default MyForm