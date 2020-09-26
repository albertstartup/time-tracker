import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { combineReducers } from 'redux'
import entriesReducer from 'features/entries/entries'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  entries: entriesReducer
})

const persistConfig = {
  key: 'time-tracker-root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)