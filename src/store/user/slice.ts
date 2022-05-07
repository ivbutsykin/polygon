import { createSlice } from '@reduxjs/toolkit';
import { TPosition, TTool } from '../../types';
import { TOOLS } from '../../constants';

interface IUserSlice {
  tool: TTool;
  pointerPosition: TPosition;
}

const initialState: IUserSlice = {
  tool: TOOLS.POLYGON,
  pointerPosition: [0, 0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },

    setPointerPosition: (state, action) => {
      state.pointerPosition = action.payload;
    },
  },
});

export const { setTool, setPointerPosition } = userSlice.actions;

export default userSlice.reducer;
