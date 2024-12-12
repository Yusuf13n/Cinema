import React, { useState } from "react";
import style from "./ModalPay.module.css";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaUser,
  FaLock,
  FaInfoCircle,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";

export const ModalPay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={handleClose}>
          <MdClose size={24} />
        </button>
        <h2 className={style.title}>Payment for the ticket</h2>
        <p className={style.description}>
          <FaInfoCircle className={style.infoIcon} />
          Your data is protected. Please fill out the form below for a
          conclusion. payment.
        </p>
        <form className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="cardNumber" className={style.label}>
              <FaCreditCard className={style.icon} />
              Card number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              className={style.input}
            />
          </div>
          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label htmlFor="expiryDate" className={style.label}>
                <FaCalendarAlt className={style.icon} /> Validity period
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                className={style.input}
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="cvv" className={style.label}>
                <FaLock className={style.icon} /> CVV
              </label>
              <input
                type="password"
                id="cvv"
                placeholder="123"
                className={style.input}
              />
            </div>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="cardHolder" className={style.label}>
              <FaUser className={style.icon} /> Holder name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="John Doe"
              className={style.input}
            />
          </div>
          <button type="submit" className={style.submitButton}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};
