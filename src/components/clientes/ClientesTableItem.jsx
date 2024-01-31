import React from 'react'
import { useDispatch } from 'react-redux'

import {
  clienteClearActiveEdit,
  clienteSetModalOpen,

  // Thunks
  deleteCliente,
  clienteSetActiveEdit,
} from '../../store/slices/clientes'
import { cuentaClearActiveEdit, cuentaClienteActive, cuentaSetListModalOpen, cuentaSetModalOpen } from '../../store/slices/cuentas'

import ClienteAvatar from '/images/user-avatar-32.png'

function ClientesTableItem({
  id,
  nombreCompleto,
  appaterno,
  apmaterno,
  nombre,
  documento_tipo,
  documento_dni,
  fecha_nacimiento,
  handleClick,
  isChecked,
}) {
  const dispatch = useDispatch()

  const handleEditClick = () => {
    dispatch(clienteClearActiveEdit())
    dispatch(
      clienteSetActiveEdit({
        id,
        appaterno,
        apmaterno,
        nombre,
        documento_tipo,
        documento_dni,
        fecha_nacimiento,
      }),
    )
    dispatch(clienteSetModalOpen(true))
  }

  const handleAddCuenta = () => {
    dispatch(cuentaClearActiveEdit())
    dispatch(
      cuentaClienteActive({
        id,
        appaterno,
        apmaterno,
        nombre,
        documento_dni,
      }),
    )
    dispatch(cuentaSetModalOpen(true))
  }

  const handleListCuentas = () => {
    dispatch(cuentaClearActiveEdit())
    dispatch(
      cuentaClienteActive({
        id,
        appaterno,
        apmaterno,
        nombre,
        documento_dni,
      }),
    )
    dispatch(cuentaSetListModalOpen(true))
  }

  const handleDeleteClick = () => {
    dispatch(deleteCliente(id))
  }

  return (
    <tr>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
        <div className='flex items-center'>
          <label className='inline-flex'>
            <span className='sr-only'>Select</span>
            <input
              id={id}
              className='form-checkbox'
              type='checkbox'
              onChange={handleClick}
              checked={isChecked}
            />
          </label>
        </div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
        <div className='flex items-center relative'>
          <button>
            <i
              className='w-4 h-4 shrink-0 fill-current far fa-circle'
            ></i>
          </button>
        </div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='w-10 h-10 shrink-0 mr-2 sm:mr-3'>
            <img
              className='rounded-full'
              src={ClienteAvatar}
              width='40'
              height='40'
              alt={''}
            />
          </div>
          <div className='font-medium text-slate-800'>{nombreCompleto}</div>
        </div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='text-left'>{documento_tipo}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='text-center'>{documento_dni}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
        <div className='text-left font-medium text-sky-500'>{fecha_nacimiento}</div>
      </td>
      <td className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
        {
          <div className='flex gap-1'>
            <button
              className='text-slate-400 hover:text-slate-500 rounded-full p-2'
              onClick={handleAddCuenta}
            >
              <span className='sr-only'>Añadir Cuenta</span>
              <svg className='w-4 h-4 fill-current' viewBox='0 0 16 16'>
                <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
              </svg>
            </button>

            <button
              className='text-slate-400 hover:text-slate-500 rounded-full p-2'
              onClick={handleListCuentas}
            >
              <span className='sr-only'>Listar Cuentas</span>
              <i className='fa-solid fa-table-list text-lg'></i>
            </button>

            <button
              className='text-slate-400 hover:text-slate-500 rounded-full'
              onClick={handleEditClick}
            >
              <span className='sr-only'>Edit</span>
              <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32'>
                <path d='M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z' />
              </svg>
            </button>

            <button
              className='text-rose-500 hover:text-rose-600 rounded-full'
              onClick={handleDeleteClick}
            >
              <span className='sr-only'>Delete</span>
              <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32'>
                <path d='M13 15h2v6h-2zM17 15h2v6h-2z' />
                <path d='M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z' />
              </svg>
            </button>
          </div>
        }
      </td>
    </tr>
  )
}

export default ClientesTableItem
