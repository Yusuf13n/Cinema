import React from 'react';
import style from './ui.module.css'


interface SeatConfirmationProps {
    handleConfirm: () => void;
    handleCancel: () => void;
    title: string;
}

export const SeatConfirmation = ({handleConfirm, handleCancel, title}: SeatConfirmationProps) => {
    return (
        <div className={style.containerModal} onClick={handleCancel}>
            <div className={style.content} onClick={(e) => e.stopPropagation()}>
                <h2 className={style.titleModal}></h2>
                <p className={style.paragraph}>Цена 350 руб. {title}</p>
                <div className={style.buttonContainer}>
                    <button onClick={handleConfirm} className={style.confirmButton}>Подтвердить покупку</button>
                    <button onClick={handleCancel} className={style.cancelButton}>Отменить</button>
                </div>
            </div>
        </div>
    )
}