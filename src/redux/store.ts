import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { appConfig } from '../lib/appConfig'



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return appConfig.isDevelopment
      ? getDefaultMiddleware({
          serializableCheck: false
        })
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        })
  },
  devTools: appConfig.isDevelopment
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
