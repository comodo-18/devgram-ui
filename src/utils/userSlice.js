import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
        return action.payload;
        },
        clearUser: () => {
        return null;
        },
        removeUser: (state, action) => {
        let newState = state.filter((user) => user._id !== action.payload);
        return newState;
        }
    },
})

export const { setUser, clearUser, removeUser } = userSlice.actions;
export default userSlice.reducer;