import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseCongfig";
import UserTripCard from "./components/UserTripCard";

const Mytrips = () => {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

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
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div>
      <div className="h-[5rem]"></div>
      <div
        className="flex flex-col bg-gray-50 h-full px-5 sm:px-20 md:px-32 lg:px-48 xl:px-72"
        style={{ fontFamily: " Poppins, sans-serif" }}
      >
        <h2 className="font-semibold  text-4xl mt-8 text-blue-500">
          My Trips Details
        </h2>
        <div className="text-gray-500 text-lg mt-2">
          Here are the trips you have created
        </div>

        <div className="flex justify-between items-center mt-2">
          <h2 className="text-2xl font-bold  text-slate-900">
            Total trips:{" "}
            <span className="text-gray-500">{userTrips?.length}</span>{" "}
          </h2>
          <div className="mr-32">
            <button
              onClick={() => navigation("/create-trip")}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Create new trip
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-8 md:grid-cols-2  gap-2 ">
          {userTrips?.length > 0 ? (
            userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={index} />
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
