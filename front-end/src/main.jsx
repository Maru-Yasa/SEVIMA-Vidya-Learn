import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { ReactQueryDevtools } from 'react-query/devtools'
import { PromptDetail } from './pages/PromptDetail'
import { Profile } from './pages/Profile'



const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute reverse element={<Login />} />
  },
  {
    path: '/register',
    element: <ProtectedRoute reverse element={<Register />} />
  },
  {
    path: '/home',
    element: <ProtectedRoute element={<Home />} />
  },
  {
    path: '/home/prompt/:id',
    element: <ProtectedRoute element={<PromptDetail />} />
  },
  {
    path: '/home/profile',
    element: <ProtectedRoute element={<Profile />} />
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
