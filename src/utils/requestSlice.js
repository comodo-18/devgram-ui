import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    setRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      let newState =  state.filter((request) => request._id !== action.payload);
      return newState;
    },
  },
});

export default requestSlice.reducer;
export const { setRequest, removeRequest } = requestSlice.actions;
