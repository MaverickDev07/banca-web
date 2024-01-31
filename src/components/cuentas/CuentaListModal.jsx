import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalBasic from '../ModalBasic'
import CuentaTable from './CuentaTable'
import { cuentaSetListModalOpen } from '../../store/slices/cuentas'

export default function CuentaListModal() {
  const dispatch = useDispatch()
  const { cuentaListModalOpen, cuentaCliente } = useSelector(
    state => state.cuentasState,
  )

  return (
    <ModalBasic
      id='list-cuenta-modal'
      modalOpen={cuentaListModalOpen}
      setModalOpen={e => {
        dispatch(cuentaSetListModalOpen(e))
      }}
      width='max-w-full lg:w-9/12'
      title='Cuentas del Cliente'>
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
        <div className='space-y-3 flex gap-7 mb-10'>
          <CuentaTable />
        </div>
      </div>
      {/* Modal footer */}
      <div className='px-5 py-4 border-t border-slate-200'>
        <div className='flex flex-wrap justify-end space-x-4'>
          <button
            className='btn-lg text-lg border-slate-200 hover:border-slate-300 text-slate-600'
            onClick={e => {
              e.stopPropagation()
              dispatch(cuentaSetListModalOpen(false))
            }}>
            Cancelar
          </button>
        </div>
      </div>
    </ModalBasic>
  )
}
