import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeFeedItem: () => {
      return null;
    },
    removeUserFromFeed: (state, action) => {
      let newState = state.filter((item) => item._id !== action.payload);
      return newState;
    },
  },
});

export const { setFeed, removeFeedItem, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;