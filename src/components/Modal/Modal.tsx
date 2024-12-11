import React, { useState } from 'react'
import style from './ui.module.css'
import { useAppDispatch, useAppSelector } from '../../Hooks'
import { bookSelectedSeats, selectSeat } from '../../Redux/Slices/seatsSlice'
import { SeatConfirmation } from '../Modal-Seat-Confirmation/SeatConfirmation'

interface handleCloseProps {
  handleClose: () => void
  title: string
}

export const Modal = ({handleClose, title}: handleCloseProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state) => state.seats.seats);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handleSeatClick = (seatId: string) => {
    dispatch(selectSeat(seatId));
  };

  const handleBooking = () => {
    setShowConfirmation(true)
  };

  const handleConfirmBooking = () => {
    dispatch(bookSelectedSeats())
    alert('Бронирование успешно');
    setShowConfirmation(false);
    handleClose();
  }

  const handleCancelBooking = () => {
    setShowConfirmation(false);
  }


  return (
    <div className={style.containerModal} onClick={handleClose}>
      <div className={style.content} onClick={handleContentClick}>
        <div className={style.blockBorder}>
        <h2 className={style.titleModal}>Movie: {title}</h2>
        <div className={style.seatingChart}>
        <h3 className={style.titleText}>Select seats:</h3>
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
        <button onClick={handleBooking} className={style.bookButton}>Reserve</button>
      </div>
      </div>
      {showConfirmation && (
        <SeatConfirmation handleConfirm={handleConfirmBooking} handleCancel={handleCancelBooking} title={title}/>
      )}
    </div>
  )
}
