import React from 'react'
import './View.css'


const View = ({title, overview, finishDate, images}) => {
    return (
        <div className="view__content">
            <div className="title">
                <div>Название:</div>
                <div>Описание:</div>
                <div>Дата завершения:</div>
                <div>Изображения:</div>
            </div>
            <div className="body">
                <h3 className="view__title">{title}</h3>
                <p className="view__overview">{overview}</p>
                <span className="view__date">{finishDate}</span>
                <div className="view__images">
                    {images ? 
                        images.map((url, index) => 
                            <img
                                key={index}
                                className="view__image"
                                src={url}
                                alt=""/>)
                        : []
                    }
                </div>
            </div>
        </div>
    )
}

export default View