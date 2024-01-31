import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  activeEdit: null,
  cuentaCliente: null,
  isLoading: false,
  cuentaModalOpen: false,
  cuentaListModalOpen: false,
}

export const cuentasSlice = createSlice({
  name: 'cuentas',

  initialState,

  reducers: {
    // Active Event
    cuentaSetActiveEdit: (state, action) => {
      state.activeEdit = action.payload
    },
    cuentaClearActiveEdit: state => {
      state.activeEdit = null
    },
    cuentaClienteActive: (state, action) => {
      state.cuentaCliente = action.payload
    },
    // Fin Active
    cuentaAddNew: (state, action) => {
      state.data = [action.payload, ...state.data]
    },
    cuentaSetModalOpen: (state, action) => {
      state.cuentaModalOpen = action.payload
    },
    cuentaSetListModalOpen: (state, action) => {
      state.cuentaListModalOpen = action.payload
    },
    cuentaLoaded: (state, action) => {
      state.isLoading = true
      state.data = action.payload
    },
    cuentaTableLimit: (state, action) => {
      state.limit = action.payload
    },
    cuentaTablePage: (state, action) => {
      state.page = action.payload
    },
    startLoading: state => {
      state.isLoading = true
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  cuentaSetActiveEdit,
  cuentaClearActiveEdit,
  cuentaClienteActive,
  cuentaAddNew,
  cuentaSetModalOpen,
  cuentaSetListModalOpen,
  cuentaLoaded,
  cuentaTableLimit,
  cuentaTablePage,
  startLoading,
} = cuentasSlice.actions
