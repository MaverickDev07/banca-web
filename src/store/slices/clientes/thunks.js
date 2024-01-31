import Swal from 'sweetalert2'

import { privateApi } from '../../../api/privateApi'
import { clienteLoaded } from './clientesSlice'

export const getClientes = ({ limit = 10, page = 0, filter = '' }) => {
  return async (dispatch, getState) => {
    const { data: response } = await privateApi.get('/clientes/searchPaged', {
      params: {
        size: limit,
        page,
        filtro: filter,
      },
      headers: {
        'Content-type': 'application/json',
        Authorization: 'token',
      },
    })
    const { content: clientes, ...pagination } = response

    dispatch(clienteLoaded({ clientes, pagination }))
  }
}

export const clienteStartAddNew = formValues => {
  return async (dispatch, getState) => {
    try {
      const { limit, page } = getState().clientesState
      const { data: response } = await privateApi.post('/clientes', formValues, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'token',
        },
      })

      dispatch(getClientes({ limit, page }))
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Save`,
        text: '¡Cliente guardado!',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log(error)
      if (error.response) {
        const { data } = error.response
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `${data.statusCode}: ${data.error}`,
          html: `<u>${data.message}</u><br>${data.stack ? data.stack : ''}`,
          showConfirmButton: false,
          timer: 2500,
        })
      } else {
        Swal.fire('Error', JSON.stringify(error.message), 'error')
      }
    }
  }
}

export const clienteStartEditCliente = formValues => {
  return async (dispatch, getState) => {
    try {
      const { limit, page } = getState().clientesState
      const { data: response } = await privateApi.put(`/clientes/${formValues['id']}`,
        formValues,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'token',
          },
        },
      )

      dispatch(getClientes({ limit, page }))
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Update`,
        text: `¡Cliente actualizado!`,
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: `${data.statusCode}: ${data.error}`,
          html: `<u>${data.message}</u><br>${data.stack ? data.stack : ''}`,
          showConfirmButton: false,
          timer: 2500,
        })
      } else {
        Swal.fire('Error', JSON.stringify(error.message), 'error')
      }
    }
  }
}

export const deleteCliente = id => {
  return async (dispatch, getState) => {
    const { limit, page } = getState().clientesState

    Swal.fire({
      title: '¿Eliminar Cliente?',
      text: 'Esta operación eliminará el cliente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar el Cliente!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { data: response } = await privateApi.delete(`/clientes/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'token',
          },
        })

        dispatch(getClientes({ limit, page }))
        Swal.fire(
          '¡Eliminado!',
          `¡Cliente eliminado: ${id}!`,
          'success',
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Cliente no eliminado 🙂', 'error')
      }
    })
  }
}
