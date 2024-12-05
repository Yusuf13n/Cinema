import { combineReducers, configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./Slices/HomeSlice";
import { filmsReducer } from "./Slices/FilmsSlice";

const rootReducer = combineReducers({
  films: filmsReducer,
  HomeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
