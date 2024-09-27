import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './auth/Login.tsx'
import Signup from './auth/Signup.tsx'
import Advertise from './pages/Advertise.tsx'
import RegisterRestaurant from './pages/RegisterRestaurant.tsx'
import ForgotPassword from './auth/ForgotPassword.tsx'
import ResetPassword from './auth/ResetPassword.tsx'
import VerifyEmail from './auth/VerifyEmail.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <Signup />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />
      },
    ]
  },
  {
    path: '/register-restaurant',
    element: <RegisterRestaurant />
  },
  {
    path: '/advertise',
    element: <Advertise />
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
