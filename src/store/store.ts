import { combineReducers, configureStore } from '@reduxjs/toolkit';
import undoable, { combineFilters, excludeAction } from 'redux-undo';
import polygonsReducer, { editPolygon } from './polygons/slice';
import newShapeReducer from './new-shape/slice';
import canvasReducer from './canvas/slice';

const rootReducer = combineReducers({
  polygons: undoable(polygonsReducer, {
    filter: combineFilters(excludeAction(editPolygon.type)),
  }),
  newShape: newShapeReducer,
  canvas: canvasReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
