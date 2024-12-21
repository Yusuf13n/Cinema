import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from "./slices/FilmsSlice";
import { authReducer } from "./slices/authSlice";
import { seatsReducer } from "./slices/seatsSlice";
import { carouselReducer } from "./slices/HomeSlice";
import pageSlice from "./slices/pageSlice";

const rootReducer = combineReducers({
  films: filmsReducer,
  carousel: carouselReducer,
  auth: authReducer,
  seats: seatsReducer,
  pages: pageSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
