import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Headers from './components/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"
import Viewtrip from './view-trip/index.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Headers />
    <Toaster />  
  <RouterProvider router={router}/>
  </React.StrictMode>
)
