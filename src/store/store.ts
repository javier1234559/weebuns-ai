import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { resetAllState } from "@/store/resetSlice";
import authReducer from "@/store/authSlice";

// Define the root state type first
export interface RootState {
  auth: ReturnType<typeof authReducer>;
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal", "vocab", "course"],
};

// Combine reducers
const reducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: RootState | undefined, action: any) => {
  if (action.type === resetAllState.type) {
    storage.removeItem("persist:root");
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
