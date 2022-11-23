import React, { Component, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import MyModal from '../UI/MyModal/MyModal'
import View from '../View/View'
import Update from '../Update/Update'
import './TodoItem.css'


const TodoItem = ({todo, deleteTodo}) => {
    const [title, setTitle] = useState(todo.title)
    const [overview, setOverview] = useState(todo.overview)
    const [finishDate, setFinishDate] = useState(todo.finishDate)
    const [img, setImg] = useState(todo.img)
    const [isDone, setIsDone] = useState(todo.isDone)
    const [viewIsVisible, setViewIsVisible] = useState(false)
    const [updateIsVisible, setUpdateIsVisible] = useState(false)

    useEffect(() => {

        /**
         * @param {string} today сегодняшний день 
         * @param {string} date заданный день в календаре
         */
        const today = dayjs(Date.now()).format("YYYY-MM-DD")
        const date = dayjs(finishDate) 

        /**
         * Если заданная дата не начинается с завтра, то todo окрашывается в зеленый
         */
        if(date.format("YYYY-MM-DD") === today || date.isBefore(today)) {
            setIsDone(true)
        } else {
            setIsDone(false)
        }
    }, [finishDate])

    /**
     * Принимает данные из форма обновления и записывает их в базу данных, затем отрисовывает на странице
     * @param {string} updateTitle обновленное название из формы обновления
     * @param {string} updateOverview обновленное описание из формы обновления
     * @param {string} updateFinishDate обновленная дата из формы обновления
     * @param {string} updateImg обновленные картинки из формы обновления
     * @param {boolean} updateIsDone выполнено todo или нет из формы обновления
     */
    const updateTodo = async (updateTitle, updateOverview, updateFinishDate, updateImg, updateIsDone) => {
        setTitle(updateTitle)
        setOverview(updateOverview)
        setImg(updateImg)
        setFinishDate(updateFinishDate)
        setIsDone(updateIsDone)
        await setDoc(doc(db, 'todos', todo.id), {
            id: todo.id,
            title: updateTitle,
            overview: updateOverview,
            finishDate: updateFinishDate,
            img: updateImg,
            isDone: updateIsDone
        })
    }

    /**
     * Принимает тип, чтобы отткрыть нужное модальное окно
     * @param {string} type просмотр или обновление
     * @returns {Component} возврощает отрисованный компонент в модальном окне
     */
    const ShowModal = ({type}) => {
        if (type === 'view') {
            return (
                <MyModal visible={viewIsVisible} setVisible={(bool) => setViewIsVisible(bool)}>
                    <View
                        title={title}
                        overview={overview}
                        finishDate={finishDate}
                        images={img}
                    />
                </MyModal>
            )
        }
        if (type === 'update') {
            return (
                <MyModal visible={updateIsVisible} setVisible={(bool) => setUpdateIsVisible(bool)}>
                    <Update
                        title={title}
                        overview={overview}
                        finishDate={finishDate}
                        img={img}
                        isDone={isDone}
                        update={updateTodo}
                        setVisible={(bool) => setUpdateIsVisible(bool)}
                    />
                </MyModal>
            )
        }
    }
    
    return (
        <>
            <ShowModal type="view"/>
            <ShowModal type="update"/>
            <div className={isDone ? "todoItem__content isDone" : "todoItem__content"}>
                <h3 className="todoItem__title">{title}</h3>        
                <p className="todoItem__overview">{overview}</p>
                <span className="todoItem__date">{finishDate}</span>
                <div className="todoItem__images">
                    {img ? 
                      img.map((i, index) => 
                      <img
                        className="todoItem__img"
                        key={index}
                        src={i}
                        alt=""
                      />)
                      : []
                    }
                </div>
                <div className="todoItem__btns">
                    <button className="btn btn--view" onClick={() => setViewIsVisible(true)}>view</button>
                    <button className="btn btn--update" onClick={() => setUpdateIsVisible(true)}>update</button>
                    <button className="btn btn--delete" onClick={() => deleteTodo(todo.id)}>delete</button>
                </div>
            </div>
        </>   
    )
}

export default TodoItem