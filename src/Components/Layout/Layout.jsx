import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { useFetchData } from '../../hooks/useFetchData'
import TodoList from '../TodoList/TodoList'
import MyModal from '../UI/MyModal/MyModal'
import MyForm from '../UI/MyForm/MyForm'
import './Layout.css'


const Layout = () => {
    const [todoList, setTodoList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const data = useFetchData()

    /**
    * Принимает данные с сервера и записывает данные в состояние
    */
    useEffect(() => {
        data.then(resp => setTodoList(resp))
    }, [])

    /** 
     * обновляет список todo
     * 
     * @param {Array<Object>} todo массив объектов
     */
    function create(todo) {
        setTodoList([...todoList, todo])
    }

    /**
     * Удаляет из базы todo элемент и после этого обнавляет состояние 
     * 
     * @param {string} id 
     */
    const destroy = async (id) => {
        await deleteDoc(doc(db, "todos", id))
        const newTodoList = todoList.filter(todo => todo.id !== id)
        setTodoList(newTodoList)
    }

    return (
        <main>
            <button className="create__btn" onClick={() => setIsVisible(true)}>create</button>
            <MyModal visible={isVisible} setVisible={(bool) => setIsVisible(bool)}>
              <MyForm create={create} setVisible={(bool) => setIsVisible(bool)}/>
            </MyModal>
            {todoList.length > 0 ?
                <TodoList todos={todoList} delTodo={destroy}/>
                : <h1 className="layout__empty">Todo list is empty</h1>
            }
            
        </main>
    )
}

export default Layout