import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  clienteSetModalOpen,
  clienteStartAddNew,
  clienteStartEditCliente,
} from '../../store/slices/clientes'
import ModalBasic from '../ModalBasic'

const initEvent = {
  nombre: '',
  appaterno: '',
  apmaterno: '',
  documento_tipo: '',
  documento_dni: '',
  fecha_nacimiento: '',
}

function ClienteModal() {
  const dispatch = useDispatch()
  const { clienteModalOpen, activeEdit } = useSelector(state => state.clientesState)

  // FormValues And SelectValues
  const [formValues, setFormValues] = useState(initEvent)

  // Destructuring FormValues
  const {
    nombre,
    appaterno,
    apmaterno,
    documento_tipo,
    documento_dni,
    fecha_nacimiento,
  } = formValues

  useEffect(() => {
    if (clienteModalOpen && activeEdit) {
      setFormValues({
        ...activeEdit,
      })
    } else {
      setFormValues(initEvent)
    }
  }, [clienteModalOpen])

  // handleChange
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const handleSubmitForm = e => {
    e.preventDefault()

    if (activeEdit) {
      dispatch(
        clienteStartEditCliente({
          ...formValues,
          id: activeEdit.id,
        }),
      )
      dispatch(clienteSetModalOpen(false))
    } else {
      dispatch(
        clienteStartAddNew({
          ...formValues,
        }),
      )
      dispatch(clienteSetModalOpen(false))
    }
  }

  return (
    <ModalBasic
      id='cliente-modal'
      modalOpen={clienteModalOpen}
      setModalOpen={e => {
        dispatch(clienteSetModalOpen(e))
      }}
      title='Agregar Cliente'>
      {/* Modal content */}
      <div className='px-5 py-4'>
        <div className='text-sm'>
          <div className='font-medium text-slate-800 mb-3'>
            Ingresa un nuevo cliente 🙌
          </div>
        </div>
        <div className='space-y-3'>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='appaterno'>
                  Apellido Paterno
                </label>
                <input
                  id='appaterno'
                  className='form-input w-full px-2 py-1'
                  type='text'
                  name='appaterno'
                  value={appaterno}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='apmaterno'>
                  Apellido Materno <span className='text-rose-500'>*</span>
                </label>
                <input
                  id='apmaterno'
                  className='form-input w-full px-2 py-1'
                  type='text'
                  name='apmaterno'
                  value={apmaterno}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {false && (
                <div className='text-xs mt-1 text-rose-500'>
                  ¡Este campo es obligatorio!
                </div>
              )}
            </div>
          </div>

          <div>
            <div>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='nombre'>
                Nombre(s) <span className='text-rose-500'>*</span>
              </label>
              <input
                id='nombre'
                className='form-input w-full px-2 py-1'
                type='text'
                name='nombre'
                value={nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            {false && (
              <div className='text-xs mt-1 text-rose-500'>
                ¡Este campo es obligatorio!
              </div>
            )}
          </div>

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='selectGenero'>
                  Tipo Documento <span className='text-rose-500'>*</span>
                </label>
                <input
                  id='documento_tipo'
                  className='form-input w-full px-2 py-1'
                  type='text'
                  name='documento_tipo'
                  value={documento_tipo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {false && (
                <div className='text-xs mt-1 text-rose-500'>
                  ¡Este campo es obligatorio!
                </div>
              )}
            </div>

            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='selectGenero'>
                  Número de Documento <span className='text-rose-500'>*</span>
                </label>
                <input
                  id='documento_dni'
                  className='form-input w-full px-2 py-1'
                  type='text'
                  name='documento_dni'
                  value={documento_dni}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {false && (
                <div className='text-xs mt-1 text-rose-500'>
                  ¡Este campo es obligatorio!
                </div>
              )}
            </div>
          </div>

          <div>
            <div>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='fecha_nacimiento'>
                Fecha de Nacimiento
              </label>
              <input
                id='fecha_nacimiento'
                className='form-input w-full px-2 py-1'
                type='date'
                name='fecha_nacimiento'
                value={fecha_nacimiento}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal footer */}
      <div className='px-5 py-4 border-t border-slate-200'>
        <div className='flex flex-wrap justify-end space-x-2'>
          <button
            className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
            onClick={e => {
              e.stopPropagation()
              setFormValues(initEvent)
              dispatch(clienteSetModalOpen(false))
            }}>
            Cancelar
          </button>
          <button
            className='btn-sm bg-indigo-500 hover:bg-indigo-600 text-white'
            onClick={handleSubmitForm}>
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  )
}

export default ClienteModal
