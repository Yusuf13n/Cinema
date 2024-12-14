import React, { useState, useEffect } from "react";
import style from "./ui.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { bookSelectedSeats, selectSeat } from "../../../redux/slices/seatsSlice";
import { ModalPay } from "../ModalPay/ModalPay";
import { MdClose } from "react-icons/md";
import { db } from "../../consts/firebase/firebase.config";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface handleCloseProps {
  handleClose: () => void;
  title: string;
}

export const Modal = ({ handleClose, title }: handleCloseProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const seats = useAppSelector((state) => state.seats.seats);
  const user = useAppSelector((state) => state.auth.user)

  // Функция для обновления состояния места в Firestore
  const updateSeatStatusInFirestore = async (seatId: string, isBooked: boolean) => {
    const seatRef = doc(db, "seats", seatId);  // Документ для конкретного места
    await updateDoc(seatRef, { isBooked });
  };

  // Функция для выбора места
  const handleSeatClick = (seatId: string) => {
    if (user) {
      dispatch(selectSeat(seatId));
      updateSeatStatusInFirestore(seatId, true);  // Обновляем место как занятое в Firestore
    } else {
      navigate('/Auth')
    }
  };

  // Функция для бронирования мест
  const handleBooking = () => {
    setShowConfirmation(true);
  };

  // Функция для подтверждения бронирования
  const handleConfirmBooking = () => {
    dispatch(bookSelectedSeats());
    setShowConfirmation(false);
    handleClose();
  };

  // Реактивное обновление состояния мест из Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "seats"), (snapshot) => {
      const updatedSeats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "seats/updateSeats", payload: updatedSeats }); // Обновляем состояние в Redux
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className={style.containerModal}>
      <div className={style.content}>
        <button className={style.closeButton} onClick={handleClose}>
          <MdClose size={24} />
        </button>
        <div className={style.blockBorder}>
          <h2 className={style.titleModal}>Movie: {title}</h2>
          <div className={style.seatingChart}>
            <h3 className={style.titleText}>Select seats:</h3>
            <div className={style.row}>
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  className={`${style.seat} ${
                    seat.isBooked
                      ? style.booked
                      : seat.isSelected
                      ? style.selected
                      : ""
                  }`}
                  onClick={() => {
                    handleSeatClick(seat.id);
                  }}
                  disabled={seat.isBooked}  // Место заблокировано, если оно занято
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleBooking} className={style.bookButton}>
            Reserve
          </button>
        </div>
      </div>
      {showConfirmation && <ModalPay />}
    </div>
  );
};
