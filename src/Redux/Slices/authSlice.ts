import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
    user: string | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}


const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        loginReqest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSicces: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})


export const { loginReqest, loginSicces, loginFailure, logout  } = authSlice.actions;
export const authReducer = authSlice.reducer;