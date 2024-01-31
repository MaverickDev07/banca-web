import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import { uiSlice } from './slices/ui/uiSlice'
import { clientesSlice } from './slices/clientes/clientesSlice'
import { cuentasSlice } from './slices/cuentas/cuentasSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['uiState', 'clientesState', 'cuentasSlice'],
}

const rootReducer = combineReducers({
  uiState: uiSlice.reducer,
  clientesState: clientesSlice.reducer,
  cuentasState: cuentasSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
