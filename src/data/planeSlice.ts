import { RootState } from './../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from './../models/Vehicle';

interface PlaneState{
    planes:Vehicle[] | undefined
}
const initialState:PlaneState = {
    planes: undefined
}

export const planeSlice = createSlice({
    name:'plane',
    initialState,
    reducers: {
        setPlanes: (state, action:PayloadAction<Vehicle[]>) => {
            state.planes = action.payload;
        }
    }
})

export const { setPlanes } = planeSlice.actions;

export const selectPlanes = (state:RootState) => state.plane.planes;

export default planeSlice.reducer;