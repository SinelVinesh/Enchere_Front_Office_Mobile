import { RootState } from '../app/store';
import { User } from './../models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: User = {
    username: '',
    token: '',
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        loggedIn: (state, action:PayloadAction<User>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        }
    }
})

export const { loggedIn } = userSlice.actions;

export const selectUser = (state:RootState) => state.user;

export default userSlice.reducer;