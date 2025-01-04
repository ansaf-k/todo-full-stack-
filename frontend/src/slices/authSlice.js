import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setcredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        Logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        }
    }
});

export const { setcredentials, Logout } = authSlice.actions;

export default authSlice.reducer;