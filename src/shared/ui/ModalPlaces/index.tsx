import React, { useState, useEffect } from "react";
import style from "./ui.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  bookSelectedSeats,
  selectSeat,
} from "../../../redux/slices/seatsSlice";
import { ModalPay } from "../ModalPay/ModalPay";
import { MdClose } from "react-icons/md";
import { db } from "../../consts/firebase/firebase.config";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Button, notification } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface handleCloseProps {
  handleClose: () => void;
  title: string;
}

const ticketPrice = 250;

export const Modal = ({ handleClose, title }: handleCloseProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state) => state.seats.seats);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "No seats selected 🔚",
      description:
        "Please select at least one seat to proceed with the reservation.",
      showProgress: true,
    });
  };

  const handleSeatClick = (seatId: string) => {
    dispatch(selectSeat(seatId));
  };

  const handleBooking = () => {
    if (!selectedDate) {
      api.open({
        message: "No date selected 📅",
        description: "Please select a date to proceed with the reservation.",
      });
      return;
    }

    const selectedSeats = seats.filter((seat) => seat.isSelected);
    if (selectedSeats.length > 0) {
      setShowConfirmation(true);
    } else {
      openNotification();
    }
  };

  const handleConfirmBooking = async () => {
    const selectedSeats = seats.filter((seat) => seat.isSelected);
    for (const seat of selectedSeats) {
      await updateSeatStatusInFirestore(seat.id, true);
    }
    dispatch(bookSelectedSeats());
    setShowConfirmation(false);
    handleClose();
  };

  const updateSeatStatusInFirestore = async (
    seatId: string,
    isBooked: boolean
  ) => {
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, { isBooked });
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
    setTotalPrice(selectedSeats.length * ticketPrice);
  }, [seats]);

  return (
    <div className={style.containerModal}>
      <div className={style.content}>
        <div className={style.blockBorder}>
          <button className={style.closeButton} onClick={handleClose}>
            <MdClose size={24} />
          </button>
          <h2 className={style.titleModal}>Movie: {title}</h2>


          <div className={style.screen}>
            <h3>Screen</h3>
          </div>
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
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={seat.isBooked}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
          <div className={style.datePickerContainer}>
            <h3>Select Date:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              className={style.customDatePicker}
            />
          </div>
          <div className={style.modalBottom}>
            <div className={style.priceContainer}>
              <h4>Total Price: {totalPrice} ₽</h4>
            </div>
            {contextHolder}
            <Button
              type="primary"
              onClick={handleBooking}
              className={style.bookButton}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
      {showConfirmation && <ModalPay onConfirmBooking={handleConfirmBooking} />}
    </div>
  );
};