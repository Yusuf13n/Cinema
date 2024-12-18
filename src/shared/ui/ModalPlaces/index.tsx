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

const ticketPrice = 250;

export const Modal = ({ handleClose, title }: handleCloseProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const seats = useAppSelector((state) => state.seats.seats);
  const user = useAppSelector((state) => state.auth.user);

  const updateSeatStatusInFirestore = async (
    seatId: string,
    isBooked: boolean
  ) => {
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, { isBooked });
  };

  const handleSeatClick = (seatId: string) => {
    if (user) {
      dispatch(selectSeat(seatId));
    } else {
      navigate("/Auth");
    }
  };

  const handleBooking = () => {
    setShowConfirmation(true);
  };

  const handleConfirmBooking = () => {
    dispatch(bookSelectedSeats());
    setShowConfirmation(false);
    handleClose();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "seats"), (snapshot) => {
      const updatedSeats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "seats/updateSeats", payload: updatedSeats });
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const selectedSeats = seats.filter((seat) => seat.isSelected);
    const price = selectedSeats.length * ticketPrice;
    setTotalPrice(price);
  }, [seats]);

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
                  disabled={seat.isBooked}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
          <div className={style.modalBottom}>
            <div className={style.priceContainer}>
              <h4>Total Price: {totalPrice} ₽</h4>
            </div>
            <button onClick={handleBooking} className={style.bookButton} disabled={!selectSeat}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && <ModalPay />}
    </div>
  );
};
