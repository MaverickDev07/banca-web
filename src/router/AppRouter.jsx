import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Clientes from '../pages/clientes/Clientes'

export function AppRouter() {
  /*if (checking && token && authorization) {
    return <h5>Espere...</h5>
  }*/

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route
          path='/clientes'
          element={
            <PublicRoute isAuthenticated={false}>
              <Clientes />
            </PublicRoute>
          }
        />

        <Route
          path='/'
          element={
            <PrivateRoute isAuthenticated={true}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* FIN Rutas para Estudiantes */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
