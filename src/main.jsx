import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Headers from "./components/custom/Header.jsx";
import { Toaster } from "@/components/ui/sonner";
import Viewtrip from "./view-trip/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Mytrips from "./my-trip";
import CommnityTrips from "./commuity-tips/index.jsx";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Landing} from "./page/Landing";
import VideoPlayer from "./page/GeneratePage";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "@/utils/ProtectedRoute";
import SignupPage from "./page/SignUpPage";
import { ChatProvider } from "@/context/ChatContext";
import { VideoProvider } from "@/context/VideoContext";
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <Mytrips />,
  },
  {
    path: "/explore-trips",
    element: <CommnityTrips />,
  }
]);

window.initMap = () => {
  console.log("Google Maps API initialized.");
};

const RootComponent = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Analytics />
      <Headers />
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<RootComponent />);
