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

const temp = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
console.log("temp",temp);

const val = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
console.log("val", val);

const firebase = import.meta.env.VITE_FIREBASE_API_KEY;
console.log("firebase", firebase);

console.log("place_api", import.meta.env.VITE_GOOGLE_PLACE_API_KEY );

 //console.log("Google Auth Client ID:", temp);

const RootComponent = () => {
  return (
    <GoogleOAuthProvider clientId={val}>
      <Headers />
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<RootComponent />);
