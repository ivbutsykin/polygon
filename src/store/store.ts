import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import undoable, { combineFilters, excludeAction } from 'redux-undo';
import polygonsReducer, { editPolygon } from './polygons/slice';
import newShapeReducer from './new-shape/slice';
import canvasReducer from './canvas/slice';

const rootReducer = combineReducers({
  polygons: undoable(polygonsReducer, {
    filter: combineFilters(excludeAction([editPolygon.type])),
  }),
  newShape: newShapeReducer,
  canvas: canvasReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['polygons'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
