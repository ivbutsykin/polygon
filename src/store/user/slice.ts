import { createSlice } from '@reduxjs/toolkit';
import { TPosition } from '../../types';

interface IUserSlice {
  pointerPosition: TPosition;
}

const initialState: IUserSlice = {
  pointerPosition: [0, 0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPointerPosition: (state, action) => {
      state.pointerPosition = action.payload;
    },
  },
});

export const { setPointerPosition } = userSlice.actions;

export default userSlice.reducer;
