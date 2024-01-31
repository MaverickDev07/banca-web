import Swal from 'sweetalert2'

import { privateApi } from '../../../api/privateApi'
import { cuentaLoaded } from './cuentasSlice'

export const getCuentas = clienteId => {
  return async (dispatch, getState) => {
    const { data: response } = await privateApi.get(`/cuentas/cliente/${clienteId}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'token',
      },
    })

    console.log(response)
    dispatch(cuentaLoaded(response))
  }
}

export const cuentaStartAddNew = formValues => {
  return async (dispatch, getState) => {
    try {
      const { data: response } = await privateApi.post('/cuentas', formValues, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'token',
        },
      })

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Save`,
        text: '¡Cuenta guardada!',
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

export const cuentaStartEdit = formValues => {
  return async (dispatch, getState) => {
    try {
      const { limit, page } = getState().cuentasState
      const { data: response } = await privateApi.put(`/cuentas/${formValues['id']}`,
        formValues,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'token',
          },
        },
      )

      dispatch(getCuentas(formValues['id']))
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Update`,
        text: `¡Cuenta actualizado!`,
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

export const deleteCuenta = (id, clienteId) => {
  return async (dispatch, getState) => {
    Swal.fire({
      title: '¿Eliminar Cuenta?',
      text: `Esta operación eliminará la cuenta ${id}, del cliente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar la Cuenta!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { data: response } = await privateApi.delete(`/cuentas/${id}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'token',
          },
        })

        dispatch(getCuentas(clienteId))
        Swal.fire(
          '¡Eliminado!',
          `¡Cuenta eliminada: ${id}!`,
          'success',
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Cuenta no eliminada 🙂', 'error')
      }
    })
  }
}
