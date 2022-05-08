import { createSlice } from '@reduxjs/toolkit';
import { TPosition, TTool, TWindowSize } from '../../types';
import { TOOLS } from '../../constants';

interface ICanvasSlice {
  tool: TTool;
  pointerPosition: TPosition | null;
  windowSize: TWindowSize;
}

const initialState: ICanvasSlice = {
  tool: TOOLS.POLYGON,
  pointerPosition: null,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
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

    setWindowSize: (state, action) => {
      state.windowSize = action.payload;
    },
  },
});

export const { setTool, setPointerPosition, setWindowSize } =
  canvasSlice.actions;

export default canvasSlice.reducer;
