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
  },
});

export const { addPolygon } = polygonsSlice.actions;

export default polygonsSlice.reducer;
