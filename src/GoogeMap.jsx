import { useEffect } from "react";

const useGoogleMapsAPI = () => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    // Check if the script is already present
    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Append the script to the document
      document.body.appendChild(script);

      // Log script loading
      script.onload = () => {
        console.log("Google Maps API loaded successfully.");
      };

      // Handle errors
      script.onerror = () => {
        console.error("Failed to load the Google Maps API.");
      };
    } else {
      console.log("Google Maps API script is already loaded.");
    }
  }, []); // Empty dependency array ensures it runs once
};

export default useGoogleMapsAPI;
