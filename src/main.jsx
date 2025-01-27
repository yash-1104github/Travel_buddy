import React, { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Headers from './components/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"
import Viewtrip from './view-trip/index.jsx'
import useGoogleMapsAPI from './GoogeMap'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Mytrips from './my-trip'



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
  {
    path: '/my-trips',
    element: <Mytrips />
  }
]);

window.initMap = () => {
  console.log("Google Maps API initialized.");
};


 const RootComponent = () => {


  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Headers />
      <RouterProvider router={router} />
      <Toaster />
      </GoogleOAuthProvider>;
    </React.StrictMode>
  );
};


createRoot(document.getElementById('root')).render(<RootComponent />);   