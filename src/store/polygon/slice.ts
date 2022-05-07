import { createSlice } from '@reduxjs/toolkit';
import { IPolygon } from '../../types';

interface IPolygonSlice {
  polygon: IPolygon | null;
  isMouseOverStartPoint: boolean;
}

const initialState: IPolygonSlice = {
  polygon: null,
  isMouseOverStartPoint: false,
};

export const polygonSlice = createSlice({
  name: 'polygon',
  initialState,
  reducers: {
    setPolygon: (state, action) => {
      state.polygon = action.payload;
    },

    addPolygonPoint: (state, action) => {
      if (!state.polygon) {
        return;
      }
      state.polygon.points.push(action.payload);
    },

    resetPolygon: (state) => {
      state.polygon = null;
      state.isMouseOverStartPoint = false;
    },

    setIsMouseOverStartPoint: (state, action) => {
      state.isMouseOverStartPoint = action.payload;
    },
  },
});

export const {
  setPolygon,
  addPolygonPoint,
  setIsMouseOverStartPoint,
  resetPolygon,
} = polygonSlice.actions;

export default polygonSlice.reducer;
