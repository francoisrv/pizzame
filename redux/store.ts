import { createStore, combineReducers, applyMiddleware, compose, Store, AnyAction } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as reducers from './reducers'
import config from './config'
import middlewares from './middlewares'
import whitelist from './storage-white-list'
import ReduxState from './state'
import { ReduxActions } from './actions'

const persistConfig = {
  key: config.storageKey,
  storage,
  whitelist,
}

/**
 * Function to create a new Redux store
 */
export default function() {
  const rootReducer = combineReducers(reducers)
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  // @ts-ignore
  const store: Store<ReduxState, ReduxActions> = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(...middlewares))
  )
  
  // @ts-ignore
  const persistor = persistStore(store)

  return { persistor, store }
}
