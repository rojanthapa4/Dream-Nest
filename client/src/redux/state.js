import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state) => {
            state.user = null;
            state.token = null;
        },
        serListings: (state, action) => {
            state.listings = action.payload.listings
        }
    }
})

export const { setLogin, setLogout, serListings} = userSlice.actions;
export default userSlice.reducer;