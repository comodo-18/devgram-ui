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
  },
});

export const { setFeed, removeFeedItem } = feedSlice.actions;
export default feedSlice.reducer;