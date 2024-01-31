import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Cliente from './ClientesTableItem'
import SearchForm from './ClienteSearchForm'
import { getClientes, clienteTableLimit } from '../../store/slices/clientes'

function ClientesTable({ selectedItems }) {
  const dispatch = useDispatch()
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])

  const {
    data = [],
    filter,
    limit,
    page,
  } = useSelector(state => state.clientesState)

  useEffect(() => {
    dispatch(getClientes({ limit, page, filter }))
  }, [limit, page, filter])

  useEffect(() => {
    selectedItems(isCheck)
  }, [isCheck])

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setIsCheck(data.map(li => li.id))
    if (selectAll) {
      setIsCheck([])
    }
  }

  const handleClick = e => {
    const { id, checked } = e.target
    setSelectAll(false)
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id))
    }
  }

  const handleLimitChange = ({ target }) => {
    dispatch(clienteTableLimit(target.value))
  }

  return (
    <div className='bg-white shadow-lg rounded-sm border border-slate-200 relative'>
      <header className='px-5 py-4 flex flex-col-reverse gap-4 sm:justify-between sm:flex-row'>
        <h2 className='font-semibold text-slate-800'>
          Mostrar:
          <input
            className='form-input w-20 ml-2'
            type='number'
            min={1}
            max={9999}
            name='limit'
            value={limit}
            onChange={handleLimitChange}
          />
        </h2>
        {/* Search form */}
        <SearchForm placeholder='[Usuario, Nombre, CI, ...]' />
      </header>
      <div>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            {/* Table header */}
            <thead className='text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200'>
              <tr>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
                  <div className='flex items-center'>
                    <label className='inline-flex'>
                      <span className='sr-only'>Select all</span>
                      <input
                        className='form-checkbox'
                        type='checkbox'
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
                  <span className='sr-only'>Conectados</span>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Nombre Completo</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold'>Tipo Documento</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Número Documento</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Fecha Nacimiento</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <span className='font-semibold text-left'>Acciones</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-slate-200'>
              {data.map(cliente => {
                let nombreCompleto = ''
                if (cliente.appaterno) nombreCompleto += cliente.appaterno
                if (cliente.apmaterno) nombreCompleto += ` ${cliente.apmaterno}`
                if (cliente.nombre) nombreCompleto += ` ${cliente.nombre}`

                return (
                  <Cliente
                    key={cliente.id}
                    id={cliente.id}
                    nombreCompleto={nombreCompleto}
                    appaterno={cliente.appaterno}
                    apmaterno={cliente.apmaterno}
                    nombre={cliente.nombre}
                    documento_tipo={cliente.documento_tipo}
                    documento_dni={cliente.documento_dni}
                    fecha_nacimiento={cliente.fecha_nacimiento
                      ? new Date(cliente.fecha_nacimiento).toISOString().substring(0, 10)
                      : ''}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(cliente.id)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientesTable
