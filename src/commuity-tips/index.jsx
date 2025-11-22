import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/service/firebaseCongfig";
import UserTripCard from "../my-trip/components/UserTripCard";

export default function CommnityTrips() {
  const [commuityTrips, setCommunityTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [city, setCity] = useState();

  useEffect(() => {
    GetTrips();
  }, []);

  const GetTrips = async () => {
    const q = query(collection(db, "communitytrips"));
    const querySnapshot = await getDocs(q);
    setCommunityTrips([]);

    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      setCommunityTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  useEffect(() => {
    setFilteredTrips(commuityTrips);
  }, [commuityTrips]);

  useEffect(() => {
    if (city == "") {
      setFilteredTrips(commuityTrips);
      return;
    }

    const res = commuityTrips.filter((trip) => {
      return trip?.tripData?.location
        ?.toLowerCase()
        .startsWith(city.toLowerCase());
    });

    //console.log("res", res);
    setFilteredTrips(res);
  }, [city]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="mt-24"></div>

        <div className="flex flex-col h-full px-5 md:px-12 lg:px-20 xl:px-24">
          <div className="flex-col md:flex ">
            <div className="flex-col">
              <h2 className="font-semibold text-3xl md:text-4xl mt-8 text-blue-500">
                Explore Community Trips
              </h2>
              <div className="text-gray-500 text-base md:text-lg mt-2">
                Here are the trips that community members have created
              </div>
            </div>

            <div>
              <input
                type="search"
                id="search"
                className="blockc w-56 md:w-96 p-3 mt-6 ps-4 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-xs placeholder:text-body"
                placeholder="Enter the City name"
                onChange={(e) => {
                  setCity(e.target.value);
                  //console.log(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrips?.length > 0 ? (
              filteredTrips.map((trip, index) => (
                <UserTripCard trip={trip} key={index} hide={true} />
              ))
            ) : (
              <h2 className="text-red-500">No trips found</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
