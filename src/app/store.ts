import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../data/userSlice';
import planeReducer from '../data/planeSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        plane: planeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;