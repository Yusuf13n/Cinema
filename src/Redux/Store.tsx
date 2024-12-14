import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from "./slices/filmsSlice";
import { authReducer } from "./slices/authSlice";
import { seatsReducer } from "./slices/seatsSlice";
import { carouselReducer } from "./slices/homeSlice";

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
