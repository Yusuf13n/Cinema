import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Moana from '../../assets/HomeImage/Moana 2.jpeg'

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface CarouselState {
  items: Item[];
  activeSlide: number;
}

const initialState: CarouselState = {
  items: [
    {
      id: 1,
      title: "Mоана 2",
      description: "Nike combines style, comfort, and innovation for every step.",
      image: Moana,
    },
    {
      id: 2,
      title: "Mоана 2",
      description: "Nike shoes enhance your workout and everyday moves with cutting-edge design.",
      image: Moana,
    },
  ],
  activeSlide: 0,
};

const HomeSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setActiveSlide: (state, action: PayloadAction<number>) => {
      state.activeSlide = action.payload;
    },
  },
});

export const { setActiveSlide } = HomeSlice.actions;
export default HomeSlice.reducer;