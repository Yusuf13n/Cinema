import React from "react";
import style from "./ui.module.css";

interface SeatConfirmationProps {
  handleConfirm: () => void;
  handleCancel: () => void;
  title: string;
}

export const SeatConfirmation = ({ handleConfirm, handleCancel, title }: SeatConfirmationProps) => {
    return (
      <div className={style.containerModal} onClick={handleCancel}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          <h2 className={style.titleModal}>Confirm</h2>
          <p className={style.paragraph}>{title}</p>
          <p className={style.price}>price: 350₽</p>
          <div className={style.buttonContainer}>
            <button onClick={handleConfirm} className={style.confirmButton}>
              Agree
            </button>
            <button onClick={handleCancel} className={style.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }