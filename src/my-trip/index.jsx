import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseCongfig";
import UserTripCard from "./components/UserTripCard";
import { toast } from "sonner";

const Mytrips = () => {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "tripinfo"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  useEffect(() => {
    setNewArray(userTrips);
  }, [userTrips]);

  useEffect(() => {
    if (city == "") {
      setNewArray(userTrips);
      return;
    }

    const res = userTrips.filter((trip) => {
      return trip?.tripData?.location
        ?.toLowerCase()
        .startsWith(city.toLowerCase());
    });

    //console.log("res", res);
    setNewArray(res);
  }, [city]);

  async function handleDelete(tripId) {
    try {
      const docRef = doc(db, "tripinfo", tripId);
      await deleteDoc(docRef);
      //console.log("Trip deleted successfully");
      toast("Trip deleted successfully");
      GetUserTrips();
    } catch (err) {
      toast("Error deleting trips, Try Again");
      console.log(err);
    }
  }

  async function handleTrips(tripId, tripData) {
    try {
      const docRef = doc(db, "communitytrips", tripId);
      await setDoc(docRef, tripData);
      //console.log("Trip added to community successfully");
      toast("Trip added to community successfully");
    } catch (err) {
      toast("Error adding trip to community, Try Again");
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-20"></div>

      <div className="flex flex-col h-full px-5 md:px-12 lg:px-20 xl:px-24">
        <h2 className="font-semibold text-3xl md:text-4xl mt-8 text-blue-500">
          My Trips Details
        </h2>
        <div className="text-gray-500 text-base md:text-lg mt-2">
          Here are the trips you have created
        </div>

        <div className="flex justify-between items-center mt-2">
          <h2 className="text-2xl font-bold mt-4  text-slate-900">
            Total trips:{" "}
            <span className="text-gray-500">{userTrips?.length}</span>{" "}
          </h2>
          <div>
            <input
              type="search"
              id="search"
              className="block w-72 md:w-96 p-3 mt-5 ps-4 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-xs placeholder:text-body"
              placeholder="Enter the City name"
              onChange={(e) => {
                setCity(e.target.value);
                //console.log(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newArray?.length > 0 ? (
            newArray.map((trip, index) => (
              <UserTripCard
                trip={trip}
                key={index}
                hide={false}
                onDelete={handleDelete}
                addTrip={handleTrips}
              />
            ))
          ) : (
            <h2 className="text-red-500">No trips found</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default Mytrips;
