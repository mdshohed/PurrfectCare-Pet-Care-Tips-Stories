import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import rentalSlice from "./features/rentalBike/rentalSlice";
import { baseApi } from "./api/baseApi";
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

// Persist configurations for each reducer
const authPersistConfig = {
  key: 'auth', // Separate key for auth
  storage,
};
;

// Apply persistence to reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configure store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, 
    auth: persistedAuthReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
    }).concat(baseApi.middleware),
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Configure persistor
export const persistor = persistStore(store);
