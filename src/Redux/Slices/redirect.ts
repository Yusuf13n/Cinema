import { createSlice } from "@reduxjs/toolkit";

interface RedirectState {
  page: string;
}

const initialState: RedirectState = {
  page: "/", 
};

export const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setStatePage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setStatePage } = redirectSlice.actions;
export const activePage = redirectSlice.reducer;
