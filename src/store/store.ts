import { combineReducers, configureStore } from '@reduxjs/toolkit';
import polygonsReducer from './polygons/slice';
import polygonReducer from './polygon/slice';
import userReducer from './user/slice';

const rootReducer = combineReducers({
  polygons: polygonsReducer,
  polygon: polygonReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
