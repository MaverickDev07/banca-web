import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '../../partials/Sidebar'
import Header from '../../partials/Header'
import ClientePagination from '../../components/clientes/ClientesPagination'
import ClienteTable from '../../components/clientes/ClientesTable'
import ClienteModal from '../../components/clientes/ClienteModal'
import { clienteClearActiveEdit, clienteSetModalOpen } from '../../store/slices/clientes'
import CuentaModal from '../../components/cuentas/CuentaModal'
import CuentaListModal from '../../components/cuentas/CuentaListModal'

function Clientes() {
  const dispatch = useDispatch()

  const { pagination } = useSelector(state => state.clientesState)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems])
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Page header */}
            <div className='sm:flex sm:justify-between sm:items-center mb-8'>
              {/* Left: Title */}
              <div className='mb-4 sm:mb-0'>
                <h1 className='text-2xl md:text-3xl text-slate-800 font-bold'>
                  Cliente ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className='grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2'>
                {/* Agregar Cliente */}
                <button
                  className='btn bg-indigo-500 hover:bg-indigo-600 text-white'
                  onClick={e => {
                    e.stopPropagation()
                    dispatch(clienteClearActiveEdit())
                    dispatch(clienteSetModalOpen(true))
                  }}>
                  <svg
                    className='w-4 h-4 fill-current opacity-50 shrink-0'
                    viewBox='0 0 16 16'>
                    <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
                  </svg>
                  <span className='hidden xs:block ml-2'>Agregar Cliente</span>
                </button>

                {/* StartModal */}
                <ClienteModal />
                <CuentaModal />
                <CuentaListModal />
                {/* EndModal */}
              </div>
            </div>

            {/* Table */}
            <ClienteTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            {!!pagination && (
              <div className='mt-8'>
                <ClientePagination />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Clientes
