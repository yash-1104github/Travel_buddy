import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseCongfig";
import { useNavigate } from "react-router-dom";
import Budget from "./components/Budget";
import Member from "./components/Member";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";


const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const modalRef = useRef(null);

  const naviagate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  function onPlaceSelect(value) {
    if (value && value.properties) {
      const locationData = {
        name: value.properties.formatted,
        lat: value.properties.lat,
        lon: value.properties.lon,
        country: value.properties.country,
      };

      setPlace(locationData);
      handleChange("location", locationData);
      //console.log("Selected Place:", locationData);
    }
  }

  function onSuggectionChange(value) {
    if (value && value.properties) {
      const locationData = {
        name: value.properties.formatted,
        lat: value.properties.lat,
        lon: value.properties.lon,
        country: value.properties.country,
      };

      setPlace(locationData);
      handleChange("location", locationData);
      //console.log("Suggestion Changed:", locationData);
    }
  }

  useEffect(() => {
    //console.log(formData);
  }, [formData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  const GenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 8) {
      toast("Please select days less than 8");
      return;
    }

    if (formData?.noOfDays < 1) {
      toast("Please select days greater than 0");
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.name
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    //console.log(FINAL_PROMPT);

    const MAX_RETRIES = 10;
    const RETRY_DELAY = 2000;

    const sendMessageWithRetries = async () => {
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const result = await chatSession.sendMessage(FINAL_PROMPT);
          return result;
        } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);

          if (error?.code === 503) {
            if (attempt < MAX_RETRIES) {
              console.warn(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
              await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            } else {
              throw new Error("Service is overloaded. Please try again later.");
            }
          } else {
            throw error;
          }
        }
      }
    };

    try {
      const result = await sendMessageWithRetries();
      //console.log(result?.response?.text());
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      //console.log("Error:", error);
      toast("Server Error, Please Enter Details again...");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
     //console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      GenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Failed to fetch user profile. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    //console.log("TripData:", TripData);

    try {
      const docID = Date.now().toString();

      await setDoc(doc(db, "tripinfo", docID), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docID,
      });

      setLoading(false);
      naviagate("/view-trip/" + docID);
      console.log("Trip saved to Firebase");
    } catch (error) {
      setLoading(false);
      toast("Server Error, Please Enter Details again...");
    }
  };

  console.log("locations", import.meta.env.VITE_GEOAPIFY_KEY);

  return (
    <div className="flex flex-col bg-gray-50 px-5 sm:px-20 md:px-28 lg:px-56 xl:px-72 ">
      <div className="h-20"></div>
      <div className="w-full">
        <h2
          className="font-semibold text-2xl md:text-3xl lg:text-4xl mt-8 text-[#f56551]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Tell us your travel preferences{" "}
        </h2>
      </div>

      <div
        className="mt-3 text-gray-800 text-base md:text-lg"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Just provide some basic information, and our trip planner will generate
        a customized itineray based on your preferences.🏡🛬
      </div>

      {/* <div className="mt-8 flex flex-col gap-5 my-8">

        <h2 className="text-xl my-1 font-medium text-blue-800">
          What is destination of choice?
        </h2>

        <GooglePlacesAutocomplete
          apikey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            place,
            onChange: (v) => {
              setPlace(v);
              handleChange("location", v);
            },
          }}
        />

      </div> */}

      <div className="mt-8 flex flex-col w-full gap-5 my-4">
        <h2 className="text-xl my-1 font-medium text-blue-800">
          What is destination of choice?
        </h2>

        <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_KEY}>
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter destination"
            placeSelect={onPlaceSelect}
            limit={10}
            suggestionsChange={onSuggectionChange}
            inputClassName=" w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500!important"
            suggestionsClassName=" bg-white  border border-gray-200 rounded-md mt-2 shadow-md text-sm!important"
          />
        </GeoapifyContext>
      </div>

      <div className="my-4">
        <div>
          <h2 className="text-xl my-3 font-medium text-blue-800">
            How many days are you planning your trip?
          </h2>
          <Input
            className="border rounded-lg "
            placeholder="Enter number of days"
            type="number"
            onChange={(e) => handleChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <Budget formData={formData} handleChange={handleChange} />

      <Member formData={formData} handleChange={handleChange} />

      <div className="my-8 justify-end flex">
        <Button
          className="h-14 w-64 text-lg tracking-wide"
          disable={loading}
          onClick={GenerateTrip}
        >
          {loading ? "Please wait..." : "Generate Trip Plan"}
          {loading ? (
            <svg
              className="animate-spin h-8 w-8 text-white ml-2"
              viewBox="3 3 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v2a7 7 0 1 1-7 7h2a5 5 0 1 0 5-5V3z"
                fill="currentColor"
              />
            </svg>
          ) : (
            ""
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent ref={modalRef} className="sm:max-w-md">
          <DialogDescription>
            <div className="flex-col font-semibold items-center h-24 text-2xl text-center text-black">
              Get Start with Travel Buddy
              <div className="flex justify-center items-center">
                <img src="/logi.png" className="w-52 h-20  object-contain " />
              </div>
            </div>
          </DialogDescription>

          <div className="flex gap-4 justify-center mt-5">
            <Button
              onClick={login}
              className="justify-center gap-4 w-full item-center"
            >
              <FcGoogle className="w-7 h-7 " />
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
