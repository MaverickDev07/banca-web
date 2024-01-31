import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clienteTablePage } from '../../store/slices/clientes/clientesSlice'

function ClientesPagination() {
  const dispatch = useDispatch()
  const { pagination, data, limit } = useSelector(state => state.clientesState)

  useEffect(() => {
    dispatch(clienteTablePage(0))
  }, [limit])

  const handlePrevious = () => {
    let numPage = +pagination.number
    if (!pagination.first) dispatch(clienteTablePage(--numPage))
  }
  const handleNext = () => {
    let numPage = +pagination.number
    if (!pagination.last) dispatch(clienteTablePage(++numPage))
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
      <nav
        className='mb-4 sm:mb-0 sm:order-1'
        role='navigation'
        aria-label='Navigation'
      >
        <ul className='flex justify-center'>
          <li className='ml-3 first:ml-0'>
            <button
              className={`btn bg-white border-slate-200 ${pagination.first
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-indigo-500 hover:border-slate-300'
                }`}
              href='#0'
              disabled={pagination.first}
              onClick={handlePrevious}
            >
              &lt;- Anterior
            </button>
          </li>
          <li className='ml-3 first:ml-0'>
            <button
              className={`btn bg-white border-slate-200 ${pagination.last
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-indigo-500 hover:border-slate-300'
                }`}
              href='#0'
              disabled={pagination.last}
              onClick={handleNext}
            >
              Siguiente -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className='text-sm text-slate-500 text-center sm:text-left'>
        Mostrando{' '}
        <span className='font-medium text-slate-600'>{data.length}</span>{' '}
        {data.length === 1 ? 'registro, ' : 'registros, '}
        {pagination.totalPages === 1 ? 'página ' : 'páginas '}
        <span className='font-medium text-slate-600'>
          {pagination.page}
        </span> de{' '}
        <span className='font-medium text-slate-600'>
          {pagination.totalPages}
        </span>
        , total registros{' '}
        <span className='font-medium text-slate-600'>
          {pagination.totalElements}
        </span>
      </div>
    </div>
  )
}

export default ClientesPagination
