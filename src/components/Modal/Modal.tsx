import React from 'react'
import style from './ui.module.css'
import { useAppDispatch, useAppSelector } from '../../Hooks'
import { bookSelectedSeats, selectSeat } from '../../Redux/Slices/seatsSlice'

interface handleCloseProps {
  handleClose: () => void
}

export const Modal = ({handleClose}: handleCloseProps) => {
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state) => state.seats.seats);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handleSeatClick = (seatId: string) => {
    dispatch(selectSeat(seatId));
  };

  const handleBooking = () => {
    dispatch(bookSelectedSeats());
    alert("Бронирование успешно");
    handleClose();
  };


  return (
    <div className={style.containerModal} onClick={handleClose}>
      <div className={style.content} onClick={handleContentClick}>
        <h2>Выберите места</h2>
        <div className={style.seatingChart}>
          <div className={style.row}>
            {seats.map((seat) => (
              <button 
              key={seat.id}
              className={`${style.seat} ${seat.isBooked ? style.booked : seat.isSelected ? style.selected : ''}`}
              onClick={() => {handleSeatClick(seat.id)}}
              disabled={seat.isBooked}
              >
                {seat.id}
              </button>
            ))}

          </div>
        </div>
        <button onClick={handleBooking} className={style.bookButton}>Забронировать</button>
      </div>
    </div>
  )
}
