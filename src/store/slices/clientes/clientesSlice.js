import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  filter: '',
  limit: 10,
  page: 0,
  activeEdit: null,
  isLoading: false,
  clienteModalOpen: false,
}

export const clientesSlice = createSlice({
  name: 'clientes',

  initialState,

  reducers: {
    // Active Event
    clienteSetActiveEdit: (state, action) => {
      state.activeEdit = action.payload
    },
    clienteClearActiveEdit: state => {
      state.activeEdit = null
    },
    // Fin Active
    clienteAddNew: (state, action) => {
      state.data = [action.payload, ...state.data]
    },
    clienteSetModalOpen: (state, action) => {
      state.clienteModalOpen = action.payload
    },
    clienteUpdated: (state, action) => {
      state.data = state.data.map(e =>
        e.id === action.payload.id ? action.payload : e,
      )
    },
    clienteDeleted: state => {
      state.data = state.data.filter(e => e.id !== state.activeEdit.id)
      state.activeEdit = null
    },
    clienteFilter: (state, action) => {
      state.filter = action.payload
    },
    clienteLoaded: (state, action) => {
      state.isLoading = false
      state.data = action.payload.clientes
      state.pagination = action.payload.pagination
    },
    clienteTableLimit: (state, action) => {
      state.limit = action.payload
    },
    clienteTablePage: (state, action) => {
      state.page = action.payload
    },
    startLoading: state => {
      state.isLoading = true
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  clienteSetActiveEdit,
  clienteClearActiveEdit,

  clienteAddNew,
  clienteSetModalOpen,
  clienteUpdated,
  clienteDeleted,
  clienteLoaded,
  clienteFilter,
  clienteTableLimit,
  clienteTablePage,
  startLoading,
} = clientesSlice.actions
