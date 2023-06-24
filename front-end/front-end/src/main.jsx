import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute reverse><Login /></ProtectedRoute>
  },
  {
    path: '/register',
    element:<ProtectedRoute reverse><Register /></ProtectedRoute>
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
