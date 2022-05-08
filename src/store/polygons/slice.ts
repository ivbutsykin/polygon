import { createSlice } from '@reduxjs/toolkit';
import { IPolygon } from '../../types';

interface IPolygonsSlice {
  polygons: IPolygon[];
}

const initialState: IPolygonsSlice = {
  polygons: [],
};

export const polygonsSlice = createSlice({
  name: 'polygons',
  initialState,
  reducers: {
    addPolygon: (state, action) => {
      state.polygons.push(action.payload);
    },

    editPolygon: (state, action) => {
      const { id, points, isClosed } = action.payload;
      const polygon = state.polygons.find((p) => p.id === id);
      if (polygon) {
        polygon.points = points;
        polygon.isClosed = isClosed;
      }
    },

    resetPolygons: (state) => {
      state.polygons = [];
    },
  },
});

export const { addPolygon, editPolygon, resetPolygons } = polygonsSlice.actions;

export default polygonsSlice.reducer;
