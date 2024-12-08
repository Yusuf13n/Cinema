import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Seat {
  id: string;
  isBooked: boolean;
  isSelected: boolean;
}

interface SeatsState {
  seats: Seat[];
}

const initialState: SeatsState = {
  seats: [
    { id: 'A1', isBooked: false, isSelected: false },
    { id: 'A2', isBooked: false, isSelected: false },
    { id: 'A3', isBooked: false, isSelected: false },
    { id: 'A4', isBooked: false, isSelected: false },
    { id: 'A5', isBooked: false, isSelected: false },
    { id: 'A6', isBooked: false, isSelected: false },
    { id: 'A7', isBooked: false, isSelected: false },
    { id: 'A8', isBooked: false, isSelected: false },
    { id: 'B1', isBooked: false, isSelected: false },
    { id: 'B2', isBooked: false, isSelected: false },
    { id: 'B3', isBooked: false, isSelected: false },
    { id: 'B4', isBooked: false, isSelected: false },
    { id: 'B5', isBooked: false, isSelected: false },
    { id: 'B6', isBooked: false, isSelected: false },
    { id: 'B7', isBooked: false, isSelected: false },
    { id: 'B8', isBooked: false, isSelected: false },
    { id: 'C1', isBooked: false, isSelected: false },
    { id: 'C2', isBooked: false, isSelected: false },
    { id: 'C3', isBooked: false, isSelected: false },
    { id: 'C4', isBooked: false, isSelected: false },
    { id: 'C5', isBooked: false, isSelected: false },
    { id: 'C6', isBooked: false, isSelected: false },
    { id: 'C7', isBooked: false, isSelected: false },
    { id: 'C8', isBooked: false, isSelected: false },
    { id: 'D1', isBooked: false, isSelected: false },
    { id: 'D2', isBooked: false, isSelected: false },
    { id: 'D3', isBooked: false, isSelected: false },
    { id: 'D4', isBooked: false, isSelected: false },
    { id: 'D5', isBooked: false, isSelected: false },
    { id: 'D6', isBooked: false, isSelected: false },
    { id: 'D7', isBooked: false, isSelected: false },
    { id: 'D8', isBooked: false, isSelected: false },
    { id: 'E1', isBooked: false, isSelected: false },
    { id: 'E2', isBooked: false, isSelected: false },
    { id: 'E3', isBooked: false, isSelected: false },
    
  ],
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    selectSeat: (state, action: PayloadAction<string>) => {
      const seat = state.seats.find((seat) => seat.id === action.payload);
      if (seat && !seat.isBooked) {
        seat.isSelected = !seat.isSelected;
      }
    },
    bookSelectedSeats: (state) => {
        state.seats.forEach((seat) => {
            if (seat.isBooked) {
                seat.isBooked = true;
                seat.isSelected = false;
            }
        })
    },
    setSeats: (state, action: PayloadAction<Seat[]>) => {
        state.seats = action.payload
    },
  },
});


export const { selectSeat, bookSelectedSeats, setSeats } = seatsSlice.actions;
export const seatsReducer = seatsSlice.reducer;