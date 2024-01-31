import { useState } from 'react'
import { Link } from 'react-router-dom'

import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner'

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className='mb-8 flex flex-wrap justify-center gap-5'>

              {/* Dashboard ADMIN */}
              <div className='flex gap-6 justify-center'>
                <div className='bg-white rounded-sm text-center p-5'>
                  <div className='flex flex-col h-full'>
                    <div className='grow mb-2'>
                      <div className='inline-flex w-16 h-16 rounded-full bg-indigo-400 justify-center items-center'>
                        <i className='fa-solid fa-users text-4xl text-blue-50'></i>
                      </div>
                      <h3 className='text-2xl font-semibold text-slate-800 mb-1'>
                        Clientes
                      </h3>
                      <div className='text-base'>Exclusivo para admin</div>
                    </div>
                    <div>
                      <Link
                        className='text-sm font-medium text-indigo-500 hover:text-indigo-600'
                        to='/clientes'>
                        Ingresar -&gt;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
