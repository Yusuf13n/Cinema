import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ItemsFetch {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
}

interface State {
  films: ItemsFetch[];
  loading: boolean,
}

export const fetchItems = createAsyncThunk<ItemsFetch[]>(
  "films/fetch",
  async () => {
    const response = await fetch(
      "https://6751d5abd1983b9597b4886c.mockapi.io/items"
    );
    const data = await response.json();
    return data;
  }
);

const initialState: State = {
  films: [],
  loading: false,
};

const filmsSlice = createSlice({
  name: "Films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchItems.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchItems.fulfilled, (state, action) => {
        state.films = action.payload;
        state.loading = false;
    })
  },
});

export const filmsReducer = filmsSlice.reducer;