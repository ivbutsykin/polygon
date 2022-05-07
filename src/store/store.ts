import { combineReducers, configureStore } from '@reduxjs/toolkit';
import polygonsReducer from './polygons/slice';
import newShapeReducer from './new-shape/slice';
import canvasReducer from './canvas/slice';

const rootReducer = combineReducers({
  polygons: polygonsReducer,
  newShape: newShapeReducer,
  canvas: canvasReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
