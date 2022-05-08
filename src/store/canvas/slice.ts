import { createSlice } from '@reduxjs/toolkit';
import { TPosition, TTool } from '../../types';
import { TOOLS } from '../../constants';

interface ICanvasSlice {
  tool: TTool;
  pointerPosition: TPosition | null;
}

const initialState: ICanvasSlice = {
  tool: TOOLS.POLYGON,
  pointerPosition: null,
};

export const canvasSlice = createSlice({
  name: 'canvas',
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

export const { setTool, setPointerPosition } = canvasSlice.actions;

export default canvasSlice.reducer;
