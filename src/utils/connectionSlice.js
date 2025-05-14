import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    setConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return state.filter((connection) => connection.id !== action.payload.id);
    },
  }});

  export const { setConnections, removeConnection } = connectionSlice.actions;
  export default connectionSlice.reducer;