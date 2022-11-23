import React, { useEffect, useState } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'


const TodoList = ({todos, delTodo}) => {

    /**
     * Передает id todo вверх в Layout, чтобы удалить todo
     * @param {string} id 
     */
    const deleteTodoItem = (id) => {
        delTodo(id)
    }

    return (
        <div className="todoList__container">
            <div className="todoList__content">
                <h3>Заголовок</h3>
                <h3>Описание</h3>
                <h3>Дата завершения</h3>
                <h3>Прикрепленные файлы</h3>
                <h3>Функции</h3>
            </div>
            <div>
                {todos.map(item => <TodoItem key={item.id} todo={item} deleteTodo={deleteTodoItem}/>)}
            </div>
        </div>
    )
}

export default TodoList