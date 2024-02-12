import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer
  },
})