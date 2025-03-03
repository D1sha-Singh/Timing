import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage in web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import timerReducer from './timersSlice'
import categoryReducer from './categoriesSlice'

// Define Persist Config
const persistConfig = {
  key: 'root', // Root key for storage
  storage,     // Local storage (default)
};

// Combine Reducers
const rootReducer = combineReducers({
  timer: timerReducer,
  category: categoryReducer
});

// Wrap Reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to prevent warnings
    }),
});

// Create Persistor
const persistor = persistStore(store);

export { store, persistor };
