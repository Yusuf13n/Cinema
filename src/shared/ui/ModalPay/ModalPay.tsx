import React, { useState } from "react";
import style from "./ModalPay.module.css";
import { FaCreditCard, FaCalendarAlt, FaUser, FaLock, FaInfoCircle, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Input, Button, Tooltip } from "antd";

interface ModalPayProps {
  onConfirmBooking: () => void;
}

export const ModalPay: React.FC<ModalPayProps> = ({ onConfirmBooking }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={closeModal}>
          <MdClose size={24} />
        </button>
        <h2 className={style.title}>Payment for the Ticket</h2>
        <p className={style.description}>
          <FaInfoCircle className={style.infoIcon} />
          Your data is protected. Please fill out the form below to complete your payment.
        </p>
        
        <div className={style.paymentIcons}>
          <Tooltip title="Visa">
            <FaCcVisa size={40} className={style.paymentIcon} />
          </Tooltip>
          <Tooltip title="MasterCard">
            <FaCcMastercard size={40} className={style.paymentIcon} />
          </Tooltip>
        </div>

        <form className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="cardNumber" className={style.label}>
              <FaCreditCard className={style.icon} />
              Card Number
            </label>
            <Input
              type="text"
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              className={style.input}
              prefix={<FaCreditCard />}
              size="large"
            />
          </div>
          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label htmlFor="expiryDate" className={style.label}>
                <FaCalendarAlt className={style.icon} /> Validity Period
              </label>
              <div className={style.dateInputWrapper}>
                <Input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className={style.inputDate}
                  prefix={<FaCalendarAlt />}
                  size="large"
                />
              </div>
            </div>
            <div className={style.formGroup}>
              <label htmlFor="cvv" className={style.label}>
                <FaLock className={style.icon} /> CVV
              </label>
              <Input.Password
                id="cvv"
                placeholder="123"
                className={style.input}
                prefix={<FaLock />}
                size="large"
              />
            </div>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="cardHolder" className={style.label}>
              <FaUser className={style.icon} /> Cardholder Name
            </label>
            <Input
              type="text"
              id="cardHolder"
              placeholder="John Doe"
              className={style.input}
              prefix={<FaUser />}
              size="large"
            />
          </div>
          <Button
            type="primary"
            className={style.submitButton}
            onClick={onConfirmBooking}
            block
            size="large"
          >
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
};