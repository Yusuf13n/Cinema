import { combineReducers, configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./Slices/HomeSlice";
import { filmsReducer } from "./Slices/FilmsSlice";
import { authReducer } from "./Slices/authSlice";
import { seatsReducer } from "./Slices/seatsSlice";

const rootReducer = combineReducers({
  films: filmsReducer,
  carousel: carouselReducer,
  auth: authReducer,
  seats: seatsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
