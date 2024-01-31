import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    msgError: null,

    nivelSigla: '',
    temporadaSigla: '1T',
    cursoSigla: '1A',
  },
  reducers: {
    setError: (state, action) => {
      state.msgError = action.payload
    },
    removeError: state => {
      state.msgError = null
    },
    startLoading: state => {
      state.loading = true
    },
    finishLoading: state => {
      state.loading = false
    },

    setNivel: (state, action) => {
      state.nivelSigla = action.payload
    },
    setTemporada: (state, action) => {
      state.temporadaSigla = action.payload
    },
    setCurso: (state, action) => {
      state.cursoSigla = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNivel, setTemporada, setCurso } = uiSlice.actions
