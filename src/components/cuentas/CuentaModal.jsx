import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import ModalBasic from '../ModalBasic'
import {
  cuentaSetModalOpen,
  cuentaStartAddNew,
} from '../../store/slices/cuentas'

const initOptionsTipoCuenta = [
  { value: '', label: 'Seleccione...' },
  { value: 'debito', label: 'Débito' },
  { value: 'credito', label: 'Crédito' }
]
const initOptionsTipoMoneda = [
  { value: '', label: 'Seleccione...' },
  { value: 'BO', label: 'Boliviano' },
  { value: 'USD', label: 'Dólar Americano' }
]
const initOptionsSucursal = [
  { value: '', label: 'Seleccione...' },
  { value: 'CH', label: 'Chuquisaca' },
  { value: 'LP', label: 'La Paz' },
  { value: 'CB', label: 'Cochabamba' },
  { value: 'SC', label: 'Santa Cruz' },
  { value: 'PT', label: 'Potosí' },
  { value: 'OR', label: 'Oruro' },
  { value: 'TJ', label: 'Tarija' },
  { value: 'BN', label: 'Beni' },
  { value: 'PA', label: 'Pando' },
]

const initEvent = {
  tipo_producto: '',
  num_cuenta: '',
  tipo_moneda: '',
  monto: 0,
  fecha_creacion: new Date().toISOString().substring(0, 10),
  sucursal: '',
}

function CuentaModal() {
  const dispatch = useDispatch()
  const { cuentaModalOpen, cuentaCliente, activeEdit } = useSelector(
    state => state.cuentasState,
  )

  // FormValues And SelectValues
  const [formValues, setFormValues] = useState(initEvent)
  const [selectTipoCuenta, setSelectTipoCuenta] = useState(null)
  const [selectTipoMoneda, setSelectTipoMoneda] = useState(null)
  const [selectSucursal, setSelectSucursal] = useState(null)
  const [optionsTipoCuenta, setOptionsTipoCuenta] = useState(initOptionsTipoCuenta)
  const [optionsTipoMoneda, setOptionsTipoMoneda] = useState(initOptionsTipoMoneda)
  const [optionsSucursal, setOptionsSucursal] = useState(initOptionsSucursal)

  // Destructuring FormValues
  const {
    tipo_producto,
    num_cuenta,
    tipo_moneda,
    monto,
    fecha_creacion,
    sucursal,
  } = formValues

  // handleChange
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const onSelectTipoCuentaChange = select => {
    setSelectTipoCuenta(select)
    setFormValues({
      ...formValues,
      tipo_producto: select?.value,
    })
  }

  const onSelectTipoMonedaChange = select => {
    setSelectTipoMoneda(select)
    setFormValues({
      ...formValues,
      tipo_moneda: select?.value,
    })
  }

  const onSelectSucursalChange = select => {
    setSelectSucursal(select)
    setFormValues({
      ...formValues,
      sucursal: select?.value,
    })
  }

  const handleSubmitForm = e => {
    e.preventDefault()

    if (activeEdit) {
      /*dispatch(
        cuentaStartEdit(activeEdit),
      )
      dispatch(cuentaSetModalOpen(false))*/
      console.log('Editar')
    } else {
      dispatch(
        cuentaStartAddNew({ ...formValues, clienteId: { id: cuentaCliente?.id } }),
      )
      dispatch(cuentaSetModalOpen(false))
    }
  }

  return (
    <ModalBasic
      id='cuenta-modal'
      modalOpen={cuentaModalOpen}
      setModalOpen={e => {
        dispatch(cuentaSetModalOpen(e))
      }}
      width='max-w-5xl'
      scroll={false}
      title='Registro de Cuenta'>
      {/* Modal content */}
      <div className='px-5 py-4'>
        <div className='flex justify-between items-center py-3 border-b border-blue-950 mb-5'>
          {/* Left */}
          <div className='text-lg text-blue-950 font-medium'>
            {`${cuentaCliente?.appaterno ?? ''} ${cuentaCliente?.apmaterno ?? ''} ${cuentaCliente?.nombre ?? ''}`}
          </div>
          {/* Right */}
          <div className='text-lg text-blue-950 font-medium ml-4'>
            {`${cuentaCliente?.documento_dni ?? ''}`}
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='appaterno'>
                  Tipo de Producto
                </label>
                <Select
                  id='switch-producto'
                  className='w-full !p-0 text-xs xs:text-sm'
                  name='tipo_producto'
                  placeholder='Seleccione...'
                  value={selectTipoCuenta}
                  options={optionsTipoCuenta}
                  onChange={onSelectTipoCuentaChange}
                />
              </div>
            </div>

            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='num_cuenta'>
                  Número de Cuenta <span className='text-rose-500'>*</span>
                </label>
                <input
                  id='num_cuenta'
                  className='form-input w-full text-base'
                  type='text'
                  name='num_cuenta'
                  value={num_cuenta}
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

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <div>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='tipo_moneda'>
                  Tipo de Moneda <span className='text-rose-500'>*</span>
                </label>
                <Select
                  id='tipo_moneda'
                  className='w-full !p-0 text-xs xs:text-sm'
                  name='tipo_moneda'
                  placeholder='Seleccione...'
                  value={selectTipoMoneda}
                  options={optionsTipoMoneda}
                  onChange={onSelectTipoMonedaChange}
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
                  htmlFor='sucursal'>
                  Sucursal <span className='text-rose-500'>*</span>
                </label>
                <Select
                  id='sucursal'
                  className='w-full !p-0 text-xs xs:text-sm'
                  name='sucursal'
                  placeholder='Seleccione...'
                  value={selectSucursal}
                  options={optionsSucursal}
                  onChange={onSelectSucursalChange}
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
                  htmlFor='fecha_creacion'>
                  Fecha de Creación
                </label>
                <input
                  id='fecha_creacion'
                  className='form-input w-full text-base'
                  type='date'
                  name='fecha_creacion'
                  value={fecha_creacion}
                  onChange={handleInputChange}
                  required
                />
              </div>

            </div>
          </div>

          <div className='flex-1'>
            <div>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='monto'>
                Monto <span className='text-rose-500'>*</span>
              </label>
              <input
                id='monto'
                className='form-input text-2xl'
                type='number'
                name='monto'
                value={monto}
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
      </div>
      {/* Modal footer */}
      <div className='px-5 py-4 border-t border-slate-200'>
        <div className='flex flex-wrap justify-end space-x-4'>
          <button
            className='btn-lg text-lg border-slate-200 hover:border-slate-300 text-slate-600'
            onClick={e => {
              e.stopPropagation()
              setFormValues(initEvent)
              dispatch(cuentaSetModalOpen(false))
            }}>
            Cancelar
          </button>
          <button
            className='btn-lg text-lg bg-indigo-500 hover:bg-indigo-600 text-white'
            onClick={handleSubmitForm}>
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  )
}

export default CuentaModal
