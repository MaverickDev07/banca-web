import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CuentaTableItem from './CuentaTableItem'
import { getCuentas } from '../../store/slices/cuentas'

export default function CuentaTable() {
  const dispatch = useDispatch()

  const { isLoading, data = [], cuentaCliente } = useSelector(state => state.cuentasState)

  useEffect(() => {
    if (cuentaCliente) {
      dispatch(getCuentas(cuentaCliente?.id))
    }
  }, [cuentaCliente])

  return (
    isLoading && (
      <div className='bg-white shadow-lg rounded-sm border border-slate-200 relative w-full'>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            {/* Table header */}
            <thead className='text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200'>
              <tr>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap bg-slate-50 text-black sticky left-0'>
                  <div className='font-semibold text-left'>Id</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Producto</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Cuenta</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Moneda</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold'>Sucursal</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold'>Creación</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold'>Monto</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <span className='font-semibold text-left'>Acciones</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-slate-200'>
              {data.map((cuenta, i) => {
                return (
                  <CuentaTableItem
                    key={cuenta.id}
                    id={cuenta.id}
                    num={i}
                    clienteId={cuenta.clienteId}
                    tipo_producto={cuenta.tipo_producto}
                    num_cuenta={cuenta.num_cuenta}
                    tipo_moneda={cuenta.tipo_moneda}
                    fecha_creacion={new Date(cuenta.fecha_creacion)
                      .toISOString()
                      .replace(/T.*/, '')
                      .split('-')
                      .reverse()
                      .join('-')}
                    sucursal={cuenta.sucursal}
                    monto={cuenta.monto}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  )
}
