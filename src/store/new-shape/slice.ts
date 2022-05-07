import { createSlice } from '@reduxjs/toolkit';
import { IPolygon } from '../../types';

interface INewShapeSlice {
  newShape: IPolygon | null;
  isMouseOverStartPoint: boolean;
}

const initialState: INewShapeSlice = {
  newShape: null,
  isMouseOverStartPoint: false,
};

export const newShapeSlice = createSlice({
  name: 'newShape',
  initialState,
  reducers: {
    setNewShape: (state, action) => {
      state.newShape = action.payload;
    },

    addNewShapePoint: (state, action) => {
      if (!state.newShape) {
        return;
      }
      state.newShape.points.push(action.payload);
    },

    resetNewShape: (state) => {
      state.newShape = null;
      state.isMouseOverStartPoint = false;
    },

    setIsMouseOverStartPoint: (state, action) => {
      state.isMouseOverStartPoint = action.payload;
    },
  },
});

export const {
  setNewShape,
  addNewShapePoint,
  setIsMouseOverStartPoint,
  resetNewShape,
} = newShapeSlice.actions;

export default newShapeSlice.reducer;
