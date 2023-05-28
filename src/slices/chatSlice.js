import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isOpen: false,
    roomId: null,
    isNewMessage: false,
  },
  reducers: {
    startChat: (state, action) => {
      state.isOpen = true;
      state.roomId = action.payload;
    },
    closeChat: (state) => {
      state.isOpen = false;
      state.roomId = null;
    },
    receiveMessage: (state) => {
      state.isNewMessage = true;
    },
    readMessage: (state) => {
      state.isNewMessage = false;
    },
  },
});

export const { startChat, closeChat, receiveMessage, readMessage } = chatSlice.actions;

export default chatSlice.reducer;