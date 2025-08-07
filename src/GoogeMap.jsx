import { useEffect } from "react";

const useGoogleMapsAPI = () => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZDwV4SCjAU8eRHjoZH9pc3DZqwHa3gec&libraries=places&callback=initMap";
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);

      script.onload = () => {
        console.log("Google Maps API loaded successfully.");
      };

      script.onerror = () => {
        console.error("Failed to load the Google Maps API.");
      };
    } else {
      console.log("Google Maps API script is already loaded.");
    }
  }, []);
};

export default useGoogleMapsAPI;
