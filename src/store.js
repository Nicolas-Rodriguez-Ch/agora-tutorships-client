import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from './slices/userSlice';

// Function that returns a new Redux store
const makeStore = () => configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const wrapper = createWrapper(makeStore, { debug: true });
